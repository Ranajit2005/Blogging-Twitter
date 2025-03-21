"use client";

import { IPost, IUser } from "@/types";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDistanceToNowStrict } from "date-fns";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

interface Props {
  comment: IPost;
  user: IUser;
  setComments: Dispatch<SetStateAction<IPost[]>>;
  comments: IPost[];
  postId: string;
}

const CommentItem = ({
  comment,
  user,
  setComments,
  comments,
  postId,
}: Props) => {
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
      await axios.delete(`/api/comments`, {
        data: {
          postId,
          commentId: comment?._id,
        },
      });
      setComments(comments.filter((item) => item._id != comment?._id));
      router.refresh();
      setIsLoading(false);

      return toast({
        title: "Comment is deleted",
        // description: "Comment is deleted",
        variant: "default",
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="border-b-[1px] relative border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
      {isLoading && (
        <div className="absolute inset-0 w-full h-full bg-black opacity-50">
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin text-sky-500" />
          </div>
        </div>
      )}

      <div className="flex flex-col">
        <div className="w-full flex items-center justify-between">
          <div
            className="flex gap-3 items-center justify-center"
            onClick={goToProfile}
          >
            <Avatar>
              <AvatarImage src={comment?.user.profilePhoto} />
              <AvatarFallback className="capitalize">
                {comment?.user.name?.[0]}
              </AvatarFallback>
            </Avatar>

            <p className="text-white font-semibold cursor-pointer hover:underline">
              {comment?.user.name}
            </p>
          </div>

          <span className="text-neutral-500 text-sm">
            {comment &&
              comment.createdAt &&
              formatDistanceToNowStrict(new Date(comment.createdAt))}{" "}
            ago
          </span>
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="text-white ml-[51px] ">{comment?.text}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            {comment?.user?._id ===
              currentUser?.data?.currentUser?.[0]?._id && (
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
