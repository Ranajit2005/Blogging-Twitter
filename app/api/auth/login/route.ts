import { connectionDatabase } from "@/lib/connection";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import { compare } from "bcryptjs"
// import { error } from "console";

export async function POST(req:Request) {
    
    try {
        
        await connectionDatabase();

        const { email,password } = await req.json();
        const isExistingUser = await User.findOne({ email })

        if(!isExistingUser){
            return NextResponse.json({
                error: "Email does not exist"
            }, { status: 400 } );
        }

        const isMatch = compare(password,isExistingUser?.password)

        if(!isMatch){
            return NextResponse.json({
                error: "Password is incorrect"
            },{ status:400 })
        }

        return NextResponse.json({
            success: true,
            user: isExistingUser
        });
       
    } catch (error) {
        console.log(error);
        const result = error as Error;
        return NextResponse.json({
            error: result.message,
        }, {status :  400} )
        
    }
}
