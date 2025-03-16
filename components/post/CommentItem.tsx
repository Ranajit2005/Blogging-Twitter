"use client"

import { IPost, IUser } from "@/types";
import { Heart, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { sliceText } from "@/lib/utils";
import { formatDistanceToNowStrict } from "date-fns";
import { useSession } from "next-auth/react";
import axios from "axios";

interface Props {
  comment: IPost;
  // key:string,
  user: IUser;
  setComments: Dispatch<SetStateAction<IPost[]>>;
  comments: IPost[];
  postId:string;
}

const CommentItem = ({ comment, user, setComments, comments,postId }: Props) => {

    const router = useRouter();
    const currentUser = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const goToProfile = (event: any) => {
        event.stopPropagation();
        router.push(`/profile/${user._id}`);
    };

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/comments`,{
                data : {
                    postId,
                    commentId:comment?._id
                }
            });
            setComments(comments.filter((item) => item._id != comment?._id));
            router.refresh();
            setIsLoading(false);


        // router.refresh();
        // return toast({
        //   title: "Success",
        //   description: data.message,
        //   variant: "default",
        // });

          
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
    };








    console.log("From comment : ",comments)

  return (
    <div className="border-b-[1px] relative border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
      {isLoading && (
        <div className="absolute inset-0 w-full h-full bg-black opacity-50">
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin text-sky-500" />
          </div>
        </div>
      )}
      <div className="flex flex-row items-center gap-3">
        <Avatar onClick={goToProfile}>
          <AvatarImage src={comment?.user.profilePhoto} />
          <AvatarFallback className="capitalize">
            {comment?.user.name?.[0]}
          </AvatarFallback>
        </Avatar>

        <div>
          <div
            className="flex flex-row items-center gap-5"
            onClick={goToProfile}
          >
            <p className="text-white font-semibold cursor-pointer hover:underline">
              {comment?.user.name}
            </p>
            {/* <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              {comment && comment?.user?.username
                ? `@${sliceText(comment.user.username, 20)}`
                : comment && sliceText(comment.user.email, 20)}
            </span> */}
            <span className="text-neutral-500 text-sm">
              {comment &&
                comment.createdAt &&
                formatDistanceToNowStrict(new Date(comment.createdAt))} ago
            </span>
          </div>
          <div className="text-white mt-1">{comment?.text}</div>

          <div className="flex flex-row items-center mt-3 gap-10">
            {/* <div
              className={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500`}
            >
              <Heart size={20} color={comment.hasLiked ? "red" : ""} />
              <p>{comment.likes || 0}</p>
            </div> */}

            {comment?.user?._id === currentUser?.data?.currentUser?.[0]?._id && (
              <div
                className={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500`}
                onClick={onDelete}
              >
                <Trash2 size={20} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
