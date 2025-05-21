import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req:Request) {
    try {
        const {name , email , password} = await req.json();


        const hashedPassword = await bcrypt.hash(password, 10);
        await connectMongoDB();
        await User.create({ name , email , password : hashedPassword});

        console.log("Name : " , name);
        console.log("Email : " , email);
        console.log("Password : " , password);
        

        return NextResponse.json({
            message : `User ${name} registered successfully!`,
        } , {status : 201});
    } catch (error) {
        return NextResponse.json({
            message : `An error occured while registering the user!`
        } , {status : 500});
    }
}