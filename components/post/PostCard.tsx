"use clinet";

import { IPost, IUser } from "@/types";
import { Heart, Loader2, MessageCircle, Trash2 } from "lucide-react";
// import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { sliceText } from "@/lib/utils";
import { formatDistanceToNowStrict } from "date-fns";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Props {
  posts: IPost[];
  post: IPost;
  user: IUser;
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

const PostCard = ({ posts, post, user, setPosts }: Props) => {

  // console.log("From post card : ",posts,post,user,)


  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLike, setIsLike] = useState(
    post?.likes?.some((user: any) => user?._id == user?._id)
  );

  if(!post?.user?.name?.[0].toUpperCase()){
    return null;
  }

  const handleLike = async (event: any) => {
    event.stopPropagation();

    try {
      // setIsLoading(true);

      const { data } = await axios.put(`/api/likes`, {
        postId: post?._id,
        userId: user?.currentUser[0]?._id,
        isLike: isLike ? false : true,
      });

      if (data?.success) {

        setPosts((prev) =>
          prev?.map((item) =>
            item?._id === data?.post?._id ? data?.post : item
          )
        );
        
        setIsLike(
          data?.post?.likes?.some((user: any) => user?._id == user?._id)
        );
        
        router.refresh();
        // console.log("Post : ", post);
        // console.log("Post Like length : ", post?.likes?.length);
      }

      // setIsLoading(false);
    } catch (error) {
      return toast({
        title: "Error",
        description: "Something went wrong, please try again leter",
        variant: "destructive",
      });
    }
  };

  const goToProfile = (userID: string) => {
    router.push(`/profile/${userID}`);
  };

  const handleDelete = async(event:any) => {
    event.stopPropagation();

    try {
      setIsLoading(true);

      const { data } = await axios.delete(`/api/posts`, {
        data : {postId: post?._id,publicId:post?.publicId}
      });

      if (data?.success) {

        setPosts(posts?.filter((item) =>
            item?._id !== post?._id
          )
        );

        router.refresh();
        return toast({
          title: "Success",
          description: data.message,
          variant: "default",
        });

      }

      setIsLoading(false);

    } catch (error) {
      return toast({
        title: "Error",
        description: "Something went wrong, please try again leter",
        variant: "destructive",
      });
    }

  }

  // console.log("form the post->", post)

  return (
    <div className="p-3 lg:p-7">
      {isLoading && (
        <div className="absolute inset-0 w-full h-full bg-black opacity-50">
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin text-sky-500" />
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <div className="flex gap-3">
        <Avatar className="cursor-pointer" onClick={() => goToProfile(post?.user?._id)}>
          <AvatarImage src={post?.user?.profilePhoto} />
          {/* <AvatarFallback>{post?.user?.name?.[0].toUpperCase()}</AvatarFallback> */}
          <AvatarFallback>{post?.user?.name?.[0].toUpperCase()}</AvatarFallback>
        </Avatar>

        <div
          className="flex items-center gap-2"
          onClick={() => goToProfile(post?.user?._id)}
        >
          <p className="text-white font-semibold cursor-pointer hover:underline capitalize">
            {post?.user?.name}
          </p>

          {/* <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
            {post?.user?.name
              ? `@${sliceText(post?.user?.name, 16)}`
              : sliceText(user?.email, 16)}
          </span> */}
        </div>
        </div>
          <span className="flex items-center text-neutral-500 text-sm pr-1">
            {formatDistanceToNowStrict(new Date(post?.createdAt))} ago
          </span>
      </div>

      <div>
        <p className="text-white mt-1 text-xl">{post?.text}</p>
        <div className="w-full h-80 max-h-96 mt-3">
          <img
            src={post?.image}
            alt={post?.text}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        <div className="flex items-center mt-3 gap-10">
          <div
            onClick={handleLike}
            className={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500`}
          >
            <Heart
              size={20}
              color={isLike ? "red" : "gray"}
              fill={isLike ? "red" : "none"}
            />
            <p>{post?.likes?.length || 0}</p>
          </div>

          <div className="flex text-neutral-500 items-center gap-2 cursor-pointer transition hover:text-sky-500">
            <MessageCircle size={20} />
            <p>{post?.comments?.length || 0}</p>
          </div>
          {post?.user?._id == user?.currentUser[0]?._id && (
            <div
              className={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500`}
              onClick={handleDelete}
            >
              <Trash2 size={20} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
