import { connectionDatabase } from "@/lib/connection";
import Notification from "@/models/notification.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    await connectionDatabase();
    const { userId, currentUserId, isFollow } = await req.json();
    // console.log("from follow route : ",userId,currentUserId)

    await User.findByIdAndUpdate(
      userId,
      isFollow ? { $pull: { followers: currentUserId } } : { $push: { followers: currentUserId } },
      { new: true }
    );

    await User.findByIdAndUpdate(
        currentUserId,
        isFollow ? { $pull: { following: userId } } : { $push: { following: userId } },
        { new: true }
    );

    if (!isFollow) {
        const notification = await Notification.create({
            text: `SomeOne Followed you`,
            user: String(userId),
        });

        await User.findByIdAndUpdate(
        userId,
            { $push: { notification: notification?._id, hasNewNotifications: true } },
            { new: true }
          );
    } 

    return NextResponse.json({ 
        success: true,
        message: `${isFollow? "Unfollow" : "Follow"}`,
    });

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
