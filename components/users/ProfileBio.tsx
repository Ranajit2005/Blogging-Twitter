"use client";

import { IUser } from "@/types";
import React, { useState } from "react";
import EditModal from "./EditModal";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import useEditModal from "@/hooks/useEditModal";
import EditProfileModal from "../modals/EditProfileModal";
import { Calendar, Loader2, LocateFixed, UserRoundPen } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { cn, sliceText } from "@/lib/utils";
import { formatDistanceToNowStrict } from "date-fns";
import Modal from "../ui/modal";
import FollowUser from "./FollowUser";

const ProfileBio = ({ user }: { user: IUser }) => {
  const editModal = useEditModal();
  const currentUser = useSession();
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);
  const [open,setOpen] = useState(false);
  const [state,setState] = useState<"following" | "followers">("following");
  const [isFetching, setIsFetching] = useState(false);
  const [following, setFollowing] = useState<IUser[]>([]);
  const [followers, setFollowers] = useState<IUser[]>([]);

  // console.log("user -> ", user?._id )
  // console.log("current user ---------> ",currentUser?.data?.currentUser?.[0]?._id)

  const handleFollowUnfollow = async (isFollow: boolean) => {
    try {
      setLoading(true);

      await axios.put("/api/follows", {
        userId: user?._id,
        currentUserId: currentUser?.data?.currentUser?.[0]?._id,
        isFollow,
      });

      router.refresh();
      setLoading(false);

    } catch (error) {
      console.log("Follow error : ", error);
      setLoading(false);
    }
  };

  const getFollowUser = async (userId:string, type: string) => {
    try {

      setIsFetching(true);
      const { data } = await axios.get(`/api/follows?state=${type}&userId=${userId}`);
      setIsFetching(false);
      return data;

    } catch (error) {
      console.log("geting Follow error",error);
    }
  }

  const openFollowModal = async (type:string) => {

    try {
      setOpen(true);
      const data = await getFollowUser(user?._id,type)

      if(type == "following"){
        setFollowing(data);
      }

      if(type == "followers"){
        setFollowers(data);
      }
      
    } catch (error) {
      
    }


  }

  const onFollowersFollowing = (item:any) => {
    setState(item);
  }

  return (
    <>
      {currentUser?.data?.currentUser?.[0]?._id == user?._id && (
        <EditModal user={user} />
      )}

      <EditProfileModal user={user} />

      <div className="relative">
        <div className="absolute right-2 z-50 bottom-4 sm:bottom-10">
          {currentUser?.data?.currentUser?.[0]?._id == user?._id ? (
            <Button
              onClick={() => editModal.onOpen()}
              className="bg-neutral-800 hover:bg-neutral-900"
            >
              <UserRoundPen size={30} className="text-white " />
            </Button>
          ) : (
            <div className="absolute right-2  bottom-32 z-50 ">
              <Button
                onClick={() => handleFollowUnfollow(user?.isFollowing)}
                // className="bg-neutral-800 hover:bg-neutral-900"
                disabled={isLoading}
              >
                {user?.isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </div>
          )}
        </div>

        <div className=" relative mt-10 sm:mt-16 px-4 ">
          <div className="flex flex-col">
            <p className="text-white  text-md sm:text-2xl font-semibold">
              {user.name}
            </p>
          </div>

          <p className="text-xs sm:text-md text-neutral-500">
            {user.username
              ? `@${sliceText(user.username, 16)}`
              : sliceText(user.email, 16)}
          </p>

          <div className="flex flex-col mt-4">
            <p className="text-white">{user.bio}</p>
            <div className="flex gap-4 items-center">
              {user.location && (
                <div className="flex flex-row items-center gap-2 mt-4 text-sky-500">
                  <LocateFixed size={24} />
                  <p>{user.location}</p>
                </div>
              )}
              <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
                <Calendar size={24} />
                <p>
                  Joined {formatDistanceToNowStrict(new Date(user.createdAt))}{" "}
                  ago
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center mt-6 gap-6">
              <div
                className="flex flex-row items-center gap-1 hover:underline cursor-pointer"
                onClick={() => openFollowModal("following")}
              >
                <p className="text-white">{user.following}</p>
                <p className="text-neutral-500">Following</p>
              </div>

              <div
                className="flex flex-row items-center gap-1 hover:underline cursor-pointer"
                onClick={() => openFollowModal("followers")}
              >
                <p className="text-white">{user.followers}</p>
                <p className="text-neutral-500">Followers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        body={
          <>
            <div className="flex flex-row w-full py-3 px-4">
              {["followers","following"]?.map((item:string,index:number)=>(
                <div
                key={index}
                className={cn(
                  " capitalize w-[50%] h-full flex justify-center items-center cursor-pointer font-semibold ",
                  state === "followers" && "border-b-[2px] border-sky-500 text-sky-500"
                )}
                onClick={()=>openFollowModal(item)}
              >
                {item}
              </div>
              ))}
              
            </div>
            {isFetching ? (
              <div className="flex justify-center items-center h-24">
                <Loader2 className="animate-spin text-sky-500" />
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                {state === "following" ? (
                  following.length === 0 ? (
                    <div className="text-neutral-600 text-center p-6 text-xl">
                      No following
                    </div>
                  ) : (
                    following.map((user) => (
                      <FollowUser
                        key={user._id}
                        user={user}
                        setFollowing={setFollowing}
                      />
                    ))
                  )
                ) : followers.length === 0 ? (
                  <div className="text-neutral-600 text-center p-6 text-xl">
                    No followers
                  </div>
                ) : (
                  followers.map((user) => (
                    <FollowUser
                      key={user._id}
                      user={user}
                      setFollowing={setFollowers}
                    />
                  ))
                )}
              </div>
            )}

            


          </>
        }
      />


    </>
  );
};

export default ProfileBio;
