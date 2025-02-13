import { connectionDatabase } from "@/lib/connection";
import Post from "@/models/post.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    try {

        await connectionDatabase();
        const { searchParams } = new URL(req.url);

        const limit = searchParams.get("limit");

        // console.log("->",searchParams)

        const posts = await Post.find({})
        .limit(Number(limit))
        .sort({ createAt: -1 });

        // console.log("use is : ",user);
        
        return NextResponse.json(posts)
        
    } catch (error) {

        const result = error as Error;
        return NextResponse.json({
            error: result.message
        }, { status: 400 })

    }
}
