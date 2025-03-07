import { getUsersById } from "@/actions/user.action";
import Header from "@/components/common/Header";
import ProfileBio from "@/components/users/ProfileBio";
import ProfileHero from "@/components/users/ProfileHero";
import { CircleUserRound } from "lucide-react";
import React from "react";

const ProfileUser = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const getUserDetails = await getUsersById(userId);
  console.log("->", getUserDetails?.user);

  return (
    <>
      <div className="flex justify-center items-center  pl-3 sm:pl-5">
        <CircleUserRound />
        <Header title={`${getUserDetails?.user?.username}`} />
      </div>

      <ProfileHero user={JSON.parse(JSON.stringify(getUserDetails?.user))} />
      <ProfileBio user={JSON.parse(JSON.stringify(getUserDetails?.user))} />
    </>
  );
};

export default ProfileUser;
