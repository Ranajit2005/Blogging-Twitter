import { IUser } from "@/types";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { sliceText } from "@/lib/utils";
import { useRouter } from "next/navigation";

const FollowUser = ({
  user,
  setFollowing,
}: {
  user: IUser;
  setFollowing: Dispatch<SetStateAction<IUser[]>>;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<IUser>(user);

  const goToProfile = (event: any) => {
    event.stopPropagation();
    router.push(`/profile/${user._id}`);
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
      {/* {profile?._id != session?.currentUser?._id ? (
        profile?.followers?.includes(session?.currentUser?._id) ? (
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
      ) : null} */}
    </div>
  );
};

export default FollowUser;
