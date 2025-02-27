import { connectionDatabase } from "@/lib/connection";
import Post from "@/models/post.model";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

export async function POST(req: Request) {

    try {

        await connectionDatabase();
        const { text,image,userId,public_id } = await req.json();
        // console.log("Public id is : ",public_id)

        const post = await Post.create({text,image,user:userId,publicId:public_id});
        
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

        const posts = await Post.find({})
        .populate("user")
        .populate("likes")
        .limit(Number(limit))
        .sort({ createAt: -1 });

        return NextResponse.json(posts)
        
    } catch (error) {

        const result = error as Error;
        return NextResponse.json({
            error: result.message
        }, { status: 400 })

    }
}

export async function DELETE(req: Request) {

    cloudinary.config({ 
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });



    try {
        await connectionDatabase();
        const { postId, publicId } = await req.json();

        await cloudinary.uploader.destroy(publicId);

        await Post.findByIdAndDelete(postId);

        return NextResponse.json({ 
            message: "Post deleted successfully",
            success: true 
        });

    } catch (error) {
        console.error("Cloudinary Deletion Error:", error);

        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Unknown error" },
            { status: 400 }
        );
    }
}
