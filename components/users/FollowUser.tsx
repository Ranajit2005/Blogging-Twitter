import { IUser } from "@/types";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { sliceText } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import axios from "axios";

const FollowUser = ({
  user,
  setFollowing,
}: {
  user: IUser;
  setFollowing: Dispatch<SetStateAction<IUser[]>>;
}) => {
  const router = useRouter();
  const { data:session } = useSession();
  const { userId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<IUser>(user);

  // console.log("Profile -> ",profile?._id)
  // console.log("->",session?.currentUser?.[0]?._id)

  const goToProfile = (event: any) => {
    event.stopPropagation();
    router.push(`/profile/${user._id}`);
  };

  const handleFollowUnfollow = async (isFollow: boolean) => {
    try {
      setIsLoading(true);

      await axios.put("/api/follows", {
        userId: user?._id,
        currentUserId: session?.currentUser?.[0]?._id,
        isFollow,
      });

      if(userId == session?.currentUser?.[0]?._id){
        if(isFollow){

          setFollowing((prev)=> prev.filter((following)=>following?._id !== user?._id));
        }else{
          setFollowing((prev)=>[
            ...prev,
            {
              ...user,
              followers: [...user.followers,session?.currentUser?.[0]?._id],
            }
          ]);
        }
      }
      

      if(isFollow){
        setProfile((prev)=> ({
          ...prev,
          followers: prev.followers?.filter(
            (follower) => follower !== session?.currentUser?.[0]?._id
          ),
          
        }));
      }else{
        setProfile((prev)=> ({
          ...prev,
          followers: [...prev.followers,session?.currentUser?.[0]?._id]
        }))
      }

      router.refresh();
      setIsLoading(false);

    } catch (error) {
      console.log("Follow error : ", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-3 items-center justify-between cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 transition py-2 px-3 rounded-md">
      <div className="flex gap-2 cursor-pointer">
        <Avatar onClick={goToProfile}>
          <AvatarImage src={profile.profilePhoto} />
          <AvatarFallback>{profile.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col" onClick={goToProfile}>
          <p className="text-white font-semibold text-sm line-clamp-1">
            {profile.name}
          </p>
          <p className="text-neutral-400 text-sm line-clamp-1">
            {profile.username
              ? `@${sliceText(user.username, 20)}`
              : sliceText(user.email, 20)}
          </p>
        </div>
      </div>


      {profile?._id != session?.currentUser?.[0]?.
    _id ? (
        profile?.followers?.includes(session?.currentUser?.[0]?._id) ? (
          <Button
            disabled={isLoading}
            onClick={() => handleFollowUnfollow(true)}
            className="h-[30px] p-0 w-fit px-3 text-sm"
          >
            Unfollow
          </Button>
        ) : (
          <Button
            disabled={isLoading}
            onClick={() => handleFollowUnfollow(false)}
            className="h-[30px] p-0 w-fit px-3 text-sm"
          >
            Follow
          </Button>
        )
      ) : null}
    </div>
  );
};

export default FollowUser;
