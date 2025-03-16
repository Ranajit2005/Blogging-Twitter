import { connectionDatabase } from "@/lib/connection";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req: Request,route:{params : {text:string}}) {

    try {

        await connectionDatabase();
        const {text} = await route.params;

        console.log("text--------->",text)

        const users = await User.find({
            $or: [
                {
                    name: { $regex: text, $options: "i" },
                    username: { $regex: text, $options: "i" },
                    email: { $regex: text, $options: "i" }
                }
            ]
        })

        console.log("users--------->",users)
        
        return NextResponse.json(users)
        
    } catch (error) {

        const result = error as Error;
        return NextResponse.json({
            error: result.message
        }, { status: 400 })

    }
}
