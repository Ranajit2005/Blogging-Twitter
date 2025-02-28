import { connectionDatabase } from "@/lib/connection";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

export async function POST(req: Request) {

    try {

        await connectionDatabase();
        const { profilePhoto,user,public_id } = await req.json();
        console.log("Public id is : ",public_id,profilePhoto,user)

        const updatedUser = await User.findByIdAndUpdate(
            user,
            { $set: {profilePhoto, profilePhotoPublicId:public_id} }
        )
        console.log("updatedUser : ",updatedUser)

        return NextResponse.json({success:true});
        
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
        const { publicId,userId } = await req.json();

        if(publicId !="") await cloudinary.uploader.destroy(publicId);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: {profilePhoto:"", profilePhotoPublicId:""} }
        )
        console.log("updatedUser : ",updatedUser)

        return NextResponse.json({ 
            message: "Profile Photo deleted successfully",
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
