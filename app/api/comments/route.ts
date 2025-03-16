import { connectionDatabase } from "@/lib/connection";
import Comment from "@/models/comment.model";
import Post from "@/models/post.model";
import { NextResponse } from "next/server";


export async function POST(req:Request) {
    try {
        await connectionDatabase();
        const { text,postId,userId } = await req.json();

        // console.log("From comment route : ",userId)

        const comment = await Comment.create({
            text,
            post:postId,
            user:userId
        })

        await Post.findByIdAndUpdate(postId,{
            $push: { comments : comment?._id },
        },{ new : true })

        return NextResponse.json(comment);

    } catch (error) {

        const result = error as Error;
        // console.log(error);
        return NextResponse.json({
            error: result.message,
        },{ status: 400 }
        );
        
    }
}
