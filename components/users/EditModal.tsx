"use client";

import { useToast } from "@/hooks/use-toast";
import { IUser } from "@/types";
import axios from "axios";
import { ImageDown, Loader2, Trash2 } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
// import { getAuthOptions } from "@/lib/authOptions";
// import { getCurrentUser } from "@/actions/user.action";

const EditModal = ({ user }: { user: IUser }) => {
  const router = useRouter();
  // const currentUser = getCurrentUser();

  // console.log("Edit modal : ",currentUser?.data?.currentUser?.[0]?._id);
  // console.log("Edit modal user : ",user?._id);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [profilePhoto, setProfilePhoto] = useState("");
  const [public_id, setPublic_id] = useState("");

  const { toast } = useToast();
  // console.log("User : ",user)
  const onSubmit = async () => {
    try {
      await axios.post("/api/profileImage", {
        profilePhoto,
        user,
        public_id,
      });

      // Note that here after submiting the post, we reset the image and public_id value
      setProfilePhoto("");
      setPublic_id("");
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      toast({
        title: "Error",
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (event: any) => {
    event.stopPropagation();

    try {
      setIsLoading(true);

      const UserWantDeletePublicId = user?.profilePhotoPublicId;
      const { data } = await axios.delete(`/api/profileImage`, {
        data: { publicId: UserWantDeletePublicId, userId: user },
      });

      if (data?.success) {
        setIsLoading(false);
        router.refresh();

        return toast({
          title: "Success",
          description: data.message,
          variant: "default",
        });
      }
    } catch (error) {
      return toast({
        title: "Error",
        description: "Something went wrong, please try again leter",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {isLoading && (
        <div className="absolute z-10 h-[300px] bg-black opacity-50 left-0 top-12 right-0 flex justify-center items-center">
          <Loader2 className="animate-spin text-sky-500" />
        </div>
      )}

      <div className=" mt-10 sm:mt-16 pl-4 relative ">
        {public_id && (
          <Button
            className="absolute left-4 sm:left-11 bottom-[-15px] sm:bottom-[-3px] mt-3 mb-1 bg-blue-600 text-white hover:bg-blue-900"
            onClick={onSubmit}
          >
            SAVE
          </Button>
        )}

        <div className="flex gap-2 pl-3 sm:pl-8 sm:gap-5">
          <CldUploadWidget
            uploadPreset="twitter-app"
            options={{
              cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            }}
            onSuccess={({ event, info }) => {
              if (event === "success") {
                setPublic_id(info?.public_id);
                setProfilePhoto(info?.secure_url);
              }
              // console.log("Info : ",info)
            }}
          >
            {({ open }) => {
              return (
                <button className=" rounded" onClick={() => open()}>
                  {/* Upload an Image */}
                  <ImageDown className=" text-neutral-500 cursor-pointer transition hover:text-white" size={18}   data-size="sm:size-[20px] md:size-[24px]"/>
                  {/* Upload */}
                </button>
              );
            }}
          </CldUploadWidget>

          {user?.profilePhotoPublicId && (
            <div
              className={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500`}
              onClick={handleDelete}
            >
              <Trash2 size={18} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditModal;
