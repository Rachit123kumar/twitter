import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "../utils/newDb"
import GithubProvider from "next-auth/providers/github"
import { signIn } from "next-auth/react";
import db from "../../_features/utils/db"
import User from "../../_models/user"
export const authOptions={
    adapter:MongoDBAdapter(client),

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
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        }),
        FacebookProvider({
            clientId:process.env.Facebook_id,
            clientSecret:process.env.FACEBOOK_CLIENT_SECRET
        }),
        GithubProvider({
            clientId:process.env.GITHUB_CLIENT_ID,
            clientSecret:process.env.GITHUB_CLIENT_SECRET
        })
    ],

    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt"
    },

//     pages:{
// // signIn:'/signin'
//     },
    callbacks: {
        // async signIn({user,account,profile}){
        //     await db.connectDb();
        //     try{
        //         const existingUser=await User.findOne({email:user.email}) 

        //         if(!existingUser){

        //             await User.create({
        //                 displayName:user.name ||"no name",
        //                 email:user.email,
        //                 userName:user.email,
        //                  profilePic: user.image || "",
        //                  verified:true
                         
        //             })
        //         }

        //         return true


        //     }catch(err){

        //     }

        // },



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


}