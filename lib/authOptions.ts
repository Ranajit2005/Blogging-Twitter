import { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectionDatabase } from "./connection";
import User from "@/models/user.model";

export const authOptions : AuthOptions = {
    providers:[


        CredentialsProvider({
            name: "credentials",
            credentials:{
                email:{label:"Email",type:"text"},
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials) {

                await connectionDatabase();

                const user = await User.findOne({email:credentials?.email});
                return user;
                
            }
        }),


        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],


    callbacks:{
        async session({session} : any){

            await connectionDatabase();

            const isExistingUser = await User.find({email:session?.user?.email,
            });

            if(!isExistingUser){
                const newUser = new User({
                    email: session.user?.email,
                    name: session.user?.name,
                    profilePhoto: session.user?.image,
                    username: session.user?.name?.replaceAll(" ","-"),
                });

                session.currentUser = newUser;
            }

            session.currentUser = isExistingUser;

            return session;
        },
    },
    session:{ strategy: "jwt"},
    jwt:{ secret: process.env.NEXTAUTH_JWT_SECRET},
    secret: process.env.NEXTAUTH_SECRET
};

export const getAuthOptions = () => getServerSession(authOptions);
