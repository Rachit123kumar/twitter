import { PORT } from "@/app/_components/FriendList";
import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "username", placeholder: "js mith" },
                password: { label: "Password", placeholder: "Enter passwoord" },


            },
            async authorize(credentials, req) {
                console.log(credentials)
                try {
                    // const res = await axios.post(`${PORT}/user/login`, {
                    const res = await axios.post(`https://watsappbackend.learngames.shop/user/login`, {
                        email: credentials.email,
                        password: credentials.password
                    })

                    console.log(res.data, "res")
                    if (res.status == 200) {
                        return res.data
                    }


                } catch (err) {
                    console.error(err)
                    return false
                }


            }
        })
    ],
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.userId;
                token.fullName = user.fullName;
                token.email = user.email;
                token.profileImage = user.profileImage
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.fullName = token.fullName;
                session.user.email = token.email;
                session.user.profileImage = token.profileImage
            }
            return session;
        }
    }


})


export { handler as GET, handler as POST }