import { IPost, IUser } from "@/types";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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

    console.log("from post card : ",post)

  return (
    <div>
      {isLoading && (
        <div className="absolute inset-0 w-full h-full bg-black opacity-50">
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin text-sky-500" />
          </div>
        </div>
      )}

      <div>
        {/* <Avatar> */}

        {user.profilePhoto == undefined?(
          <Avatar>
            <AvatarImage src={data?.user?.image} />
            <AvatarFallback>{data?.user?.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        ):(
            <Avatar>
            <AvatarImage src={user.profilePhoto} />
            <AvatarFallback>{user?.name[0].toUpperCase()}</AvatarFallback>
            {/* if user gives error, then use user[0].name[0].toUpperCase() */}
            </Avatar>
          )}
      {/* </Avatar> */}

          <div>
            <p>{post?.user?.name}</p>
          </div>

      </div>

    </div>
  );
};

export default PostCard;
