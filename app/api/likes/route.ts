import { connectionDatabase } from "@/lib/connection";
import Notification from "@/models/notification.model";
import Post from "@/models/post.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    await connectionDatabase();
    const { postId, userId, isLike } = await req.json();
    console.log("from likes route : ",userId, postId,isLike)

    const post = await Post.findByIdAndUpdate(
      postId,
      isLike ? { $push: { likes: userId } } : { $pull: { likes: userId } },
      { new: true }
    ).populate("user");

    const name = await User.findById(userId).select("username")
    // console.log("The user name is : ",name?.username)

    // console.log("Post -> ",post?.user?._id)

    // const isRed = await Post.findById(postId).select("likes")
    // console.log("Check is Red 1 : ",isRed?.likes)
    // const isRedString = isRed?.likes.toString();

    // const likedddm = await post.likes.findById("67b5f52026b9dfbad52cd166")
    // console.log("Ture or false : ",likedddm)
    // console.log("Check is Red 2 : ",isRedString)
    // console.log("Check is Red : ",typeof(isRedString))

    // const isPresent = await Post.findOne({likes: Object(userId)})
    // console.log("is Present : ",isPresent)
    // console.log("User id : ",typeof(userId))

    // let isRed = false;
    // if(isPresent == null) isRed = true;


    const UserobjectIdWhoPost = post?.user?._id
    const userWhoPost = UserobjectIdWhoPost.toString();
    // console.log("The object id is : ",userWhoPost)


    if (isLike) {
      const notification = await Notification.create({
        text: `${name?.username} has liked your post`,
        user: userWhoPost,
      });
      await User.findByIdAndUpdate(
        userWhoPost,
        { $push: { notification: notification?._id, hasNewNotifications: true } },
        { new: true }
      );
    }

    

    return NextResponse.json({ success: true });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json(
      {
        error: result.message,
      },
      { status: 400 }
    );
  }
}
