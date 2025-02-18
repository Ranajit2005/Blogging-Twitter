import { IPost, IUser } from "@/types";
import { Heart, Loader2, MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { sliceText } from "@/lib/utils";
import { formatDistanceToNowStrict } from "date-fns";

interface Props {
  post: IPost;
  user: IUser;
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

const PostCard = ({ post, user, serPosts }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data } = useSession();
  if (!data?.user) {
    return null; // or some fallback UI
  }

  console.log("from post card : ", post);

  return (
    <div className="p-10">
      {isLoading && (
        <div className="absolute inset-0 w-full h-full bg-black opacity-50">
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin text-sky-500" />
          </div>
        </div>
      )}

      <div className="flex gap-3">

          <Avatar>
            <AvatarImage src={post?.user?.image} />
            <AvatarFallback>{post?.user?.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        

        <div className="flex items-center gap-2">
          <p className="text-white font-semibold cursor-pointer hover:underline capitalize">
            {post?.user?.name}
          </p>

          <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
            {post?.user?.name
              ? `@${sliceText(post?.user?.name, 16)}`
              : sliceText(user?.email, 16)}
          </span>

          <span className="text-neutral-500 text-sm">
            {formatDistanceToNowStrict(new Date(post?.createdAt))}
          </span>
        </div>
      </div>

      <div>

        <p className="text-white mt-1 text-xl" >{post?.text}</p>
        <div className="w-full h-80 max-h-96 mt-3" >
            <img 
              src={post?.image} 
              alt={post?.text} 
              className="w-full h-full object-cover rounded-md"
            />
        </div>

        <div className="flex items-center mt-3 gap-10">
          

          <div
            // onClick={handleLike}
            className={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500`}
          >
            <Heart size={20} color={post?.hasLiked ? "red" : "gray"} />
            <p>{post?.likes?.length || 0}</p>
          </div>

          <div className="flex text-neutral-500 items-center gap-2 cursor-pointer transition hover:text-sky-500">
            <MessageCircle size={20}/>
            <p>{post?.comments?.length || 0}</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PostCard;
