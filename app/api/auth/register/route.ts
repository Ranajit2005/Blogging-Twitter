import { connectionDatabase } from "@/lib/connection";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs"

export async function POST(req:Request) {
    
    try {
        
        await connectionDatabase();
        const { searchParams } = new URL(req.url);
        const step = searchParams.get("step");

        // For step 1 verification

        if(step == "1"){

            const { email } = await req.json();
            const isExistingUser = await User.findOne({ email })

            if(isExistingUser){
                return NextResponse.json({
                    error: "Email already exist",
                }, { status: 400 });
            }

            return NextResponse.json({
                success: true
            });
        }

        // For step 2 verification

        if(step == "2"){

            const { email,username,name,password } = await req.json();
            const isExixtingUsername = await User.findOne({ username })

            if(isExixtingUsername){
                return NextResponse.json({
                    error: "Username already exist",
                }, { status: 400 });
            }

            const hashedPassword = await hash(password,10);

            const user = await User.create({
                email,
                username,
                name,
                password: hashedPassword
            });

            return NextResponse.json({
                success: true,
                user
            });
        }
       
    } catch (error) {
        console.log(error);
        const result = error as Error;
        return NextResponse.json({
            error: result.message,
        }, {status :  400} )
        
    }
}
