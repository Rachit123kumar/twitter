import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import axios from "axios";
import db from "../../_features/utils/db";
import User from "../../_models/user";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", placeholder: "john@example.com" },
        password: { label: "Password", placeholder: "Enter password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(`https://watsappbackend.learngames.shop/user/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          const data = res.data;
          if (res.status === 200 && data) {
            return {
              id: data._id,
              email: data.email,
              name: data.fullName || "No Name",
              image: data.profilePic || "",
              userName: data.userName,
              verified: data.verified,
            };
          }

          return null;
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  secret: process.env.AUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      await db.connectDb();
      try {
        let existingUser = await User.findOne({ email: user.email });

        // Prevent login if user is unverified
        if (existingUser && !existingUser.verified) {
          console.log("User is not verified");
          return false;
        }

        // Generate unique username
        async function createUserName(email) {
          const randomNumber = Math.random().toFixed(5).split(".")[1];
          const base = email.split("@")[0];
          const userName = `${base}${randomNumber}`;

          const userExists = await User.findOne({ userName });
          return userExists ? await createUserName(email) : userName;
        }

        if (!existingUser) {
          const userName = await createUserName(user.email);
          const newUser = await User.create({
            displayName: user.name || "No Name",
            email: user.email,
            userName,
            profilePic: user.image || "",
            verified: true,
          });
          user.id = newUser._id;
        } else {
          user.id = existingUser._id;
          user.userName = existingUser.userName;
          user.profilePic = existingUser.profilePic;
          user.verified = existingUser.verified;
        }

        return true;
      } catch (err) {
        console.error("signIn error:", err);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.fullName = user.name || user.fullName || "No Name";
        token.email = user.email;
        token.profileImage = user.image || user.profilePic || "";
        token.userName = user.userName || "";
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.fullName = token.fullName;
        session.user.email = token.email;
        session.user.profileImage = token.profileImage;
        session.user.userName = token.userName;
      }
      return session;
    },
  },
};
