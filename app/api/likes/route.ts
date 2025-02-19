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

    if (isLike) {
      const notification = await Notification.create({
        text: `${post?.user?.name} has liked your post`,
        user: String(userId),
      });
      await User.findByIdAndUpdate(
        userId,
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
