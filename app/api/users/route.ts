import { connectionDatabase } from "@/lib/connection";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    try {

        await connectionDatabase();
        const { searchParams } = new URL(req.url);

        const limit = searchParams.get("limit");
        const userId = searchParams.get("userId")

        // console.log("limit---------->",limit)
        // console.log("userId---------->",userId)

        const user = await User.find({
            _id: { $ne: userId }
        })
        .select("name username _id email profilePhoto")
        .limit(Number(limit))
        .sort({ createAt: -1 });

        // console.log("use is : ",user);
        
        return NextResponse.json(user)
        
    } catch (error) {

        const result = error as Error;
        return NextResponse.json({
            error: result.message
        }, { status: 400 })

    }
}
