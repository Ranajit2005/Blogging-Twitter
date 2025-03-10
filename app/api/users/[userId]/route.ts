import { connectionDatabase } from "@/lib/connection";
import Post from "@/models/post.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function PUT(req: Request,route:{params:{userId:string}}) {

    try {

        await connectionDatabase();
        
        const body = await req.json();
        const { userId } = route.params;
        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type");

        
        if (type == "updateImage") {
            await User.findByIdAndUpdate(userId, body, { new: true });
            return NextResponse.json({ message: "User updated successfully" });
          } else if (type === "updateFields") {
            const existUser = await User.findById(userId);
        
            if (body?.username !== existUser?.username) {
              const usernameExist = await User.exists({ username: body.username });
              if (usernameExist) {
                return NextResponse.json(
                  { error: "Username already exists" },
                  { status: 400 }
                );
              }
            }
        
            await User.findByIdAndUpdate(userId, body, { new: true });
            return NextResponse.json({ message: "User updated successfully",success: true });
          }
    } catch (error) {
      const result = error as Error;
      return NextResponse.json({ error: result.message }, { status: 400 });
    }
        
}


export async function GET(req: Request,route:{params:{userId:string}}) {

    try {

        await connectionDatabase();

        const { userId } = route.params;

        // const { searchParams } = new URL(req.url);
        // const currentUserId = searchParams.get("currentUserId");

        // console.log("current user ------->",  currentUserId)

        const user = await User.findById(userId);

        // const updatedUser = {
        //   ...user,
        //   followers: user.followers?.length || 0,
        //   following: user.following?.length || 0,
        //   isFollowing: user.followers?.includes(currentUserId) || false
        // }

        // console.log("updated user ----------->",updatedUser._doc?.following.length)
        // console.log("updated user ----------->",updatedUser)

        const posts = await Post.find({
            user:user?._id
        })
        
        return NextResponse.json({ 
            user,
            posts,
            success:true
        }); 
        
    } catch (error) {

        const result = error as Error;
        return NextResponse.json({
            error: result.message
        }, { status: 400 })

    }
}
