"use client"

import { IUser } from "@/types";
import React, { useState } from "react";
import EditModal from "./EditModal";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import useEditModal from "@/hooks/useEditModal";
import EditProfileModal from "../modals/EditProfileModal";
import {  UserRoundPen } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const ProfileBio = ({ user }: { user: IUser }) => {
  const editModal = useEditModal();
  const currentUser = useSession();
  const router = useRouter();

  const [isLoading,setLoading] = useState(false);



  // console.log("user -> ", user?._id )
  // console.log("current user ---------> ",currentUser?.data?.currentUser?.[0]?._id)

  const handleFollowUnfollow = async (isFollow:boolean) => {
    try {

      setLoading(true);

      await axios.put('/api/follows',{
        userId:user?._id,
        currentUserId:currentUser?.data?.currentUser?.[0]?._id,
        isFollow,
      })

      setLoading(false);
      router.refresh();
      
    } catch (error) {

      console.log("Follow error : ",error)
      setLoading(false);
    }
  }
  
  return (
    <>
      {currentUser?.data?.currentUser?.[0]?._id == user?._id && (
        <EditModal user={user} />
      )}

      <EditProfileModal user={user}/>

      <div className="relative bg-red-200">
        <div className="absolute right-2  bottom-4 sm:bottom-10"> 
          {currentUser?.data?.currentUser?.[0]?._id == user?._id ? (
            <Button
              onClick={()=> editModal.onOpen()}
              className="bg-neutral-800 hover:bg-neutral-900"
            >
              <UserRoundPen size={30} className="text-white "/>
            </Button>
         ):  (
            <div className="absolute right-2  -bottom-16 sm:-bottom-20">
            <Button
              onClick={()=>handleFollowUnfollow(user?.isFollowing)}
              // className="bg-neutral-800 hover:bg-neutral-900"
              disabled={isLoading}
            >
              {user?.isFollowing ? "Unfollow" : "Follow"}
            </Button>
            </div> 

         )}
        </div>

        
      </div>
    </>
  );
};

export default ProfileBio;
