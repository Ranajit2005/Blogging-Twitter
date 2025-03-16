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

export async function DELETE(req: Request) {
  try {
    await connectionDatabase();
    const { postId,commentId } = await req.json();
    console.log(commentId, "commentId");

    await Post.findByIdAndUpdate(postId,{
        $pull: { comments : commentId },
    },{ new : true })

    await Comment.findByIdAndDelete(commentId);


    return NextResponse.json({ message: "Comment deleted", success: true });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
