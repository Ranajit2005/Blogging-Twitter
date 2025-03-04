"use client"

import { IUser } from "@/types";
import React from "react";
import EditModal from "./EditModal";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import useEditModal from "@/hooks/useEditModal";

const ProfileBio = ({ user }: { user: IUser }) => {
  const editModal = useEditModal();
  const currentUser = useSession();


  return (
    <>
      {currentUser?.data?.currentUser?.[0]?._id == user?._id && (
        <EditModal user={user} />
      )}

      <div>
        <div> 
          {/* {currentUser?.data?.currentUser?.[0]?._id == user?._id && (
            <Button
              onClick={()=>editModal.onOpen()}
            >Edit Profile</Button>
         )} */}
        </div>
      </div>
    </>
  );
};

export default ProfileBio;
