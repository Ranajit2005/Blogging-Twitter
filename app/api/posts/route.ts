import { connectionDatabase } from "@/lib/connection";
import Post from "@/models/post.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {

        await connectionDatabase();
        const { text,image,userId } = await req.json();
        // console.log("User id is : ",userId)

        const post = await Post.create({text,image,user:userId});
        
        return NextResponse.json(post)
        
    } catch (error) {

        const result = error as Error;
        return NextResponse.json({
            error: result.message
        }, { status: 400 })

    }
}

export async function GET(req: Request) {

    try {

        await connectionDatabase();
        const { searchParams } = new URL(req.url);

        const limit = searchParams.get("limit");

        // console.log("->",searchParams)

        const posts = await Post.find({})
        .populate("user")
        .populate("likes")
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
