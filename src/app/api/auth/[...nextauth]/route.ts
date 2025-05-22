import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers : [
        CredentialsProvider({
            name : "Credentials",
            credentials : {},

            async authorize(credentials) {

                const {email ,password} = credentials as any;

                try {
                    await connectMongoDB();
                    const user = await User.findOne({email})                

                    if (!user) {
                        return null;
                    }

                    const isPasswordCorrect = await bcrypt.compare(password , user.password);
                    if (!isPasswordCorrect) {
                        return null;
                    }

                    return user;
                } catch (error) {
                    console.log("Error in authorize function: ", error);
                    
                }
                // const user = { id : "1"}
                // return user;
            }
        })
    ],
    sesion: {
        strategy: "jwt",
    },
    secret : process.env.NEXTAUTH_SECRET,
    pages : {
        signIn : '/'
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };