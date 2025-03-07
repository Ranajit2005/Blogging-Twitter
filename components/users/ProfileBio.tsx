"use client"

import { IUser } from "@/types";
import React from "react";
import EditModal from "./EditModal";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import useEditModal from "@/hooks/useEditModal";
import EditProfileModal from "../modals/EditProfileModal";
import {  UserRoundPen } from "lucide-react";

const ProfileBio = ({ user }: { user: IUser }) => {
  const editModal = useEditModal();
  const currentUser = useSession();

  
  return (
    <>
      {currentUser?.data?.currentUser?.[0]?._id == user?._id && (
        <EditModal user={user} />
      )}

      <EditProfileModal user={user}/>

      <div className="relative bg-red-200">
        <div className="absolute right-2  bottom-4 sm:bottom-10"> 
          {currentUser?.data?.currentUser?.[0]?._id == user?._id && (
            <Button
              onClick={()=> editModal.onOpen()}
              className="bg-neutral-800 hover:bg-neutral-900"
            >
              <UserRoundPen size={30} className="text-white "/>
            </Button>
         )}
        </div>
      </div>
    </>
  );
};

export default ProfileBio;
