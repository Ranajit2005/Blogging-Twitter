import { getUsersById } from "@/actions/user.action";
import Header from "@/components/common/Header";
import ProfileBio from "@/components/users/ProfileBio";
import ProfileHero from "@/components/users/ProfileHero";
import UserPosts from "@/components/users/UserPosts";
import { CircleUserRound } from "lucide-react";
import React from "react";

const ProfileUser = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const getUserDetails = await getUsersById(userId);

  // console.log("from profile page--->",getUserDetails?.posts)

  return (
    <>
      <div className="flex justify-center items-center  pl-3 sm:pl-5">
        <CircleUserRound />
        <Header title={`@${getUserDetails?.user?.username}`} />
      </div>
      <div className="">
      <ProfileHero user={JSON.parse(JSON.stringify(getUserDetails?.user))} />
      <ProfileBio user={JSON.parse(JSON.stringify(getUserDetails?.user))} />
      <div className="border-b-[1px] border-neutral-800 px-5 py-2"></div>
      <UserPosts user={JSON.parse(JSON.stringify(getUserDetails?.user))} 
        getPosts={getUserDetails?.posts || []}
      />
      
      </div>
    </>
  );
};

export default ProfileUser;
