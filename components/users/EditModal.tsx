"use client";

import { useToast } from "@/hooks/use-toast";
import { IUser } from "@/types";
import axios from "axios";
import { ImageDown, Loader2, Trash2 } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


const EditModal = ({ user }: { user: IUser }) => {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [coverPhoto,setCoverPhoto] = useState("");

  const [profilePhoto, setProfilePhoto] = useState("");
  const [public_id, setPublic_id] = useState("");

  const { toast } = useToast();

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
      setIsLoading(false);
      router.refresh();

    } catch (error) {
      setIsLoading(false);

      toast({
        title: "Error",
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    }
  };

    const handleDelete = async(event:any) => {
      event.stopPropagation();
  
      try {
        setIsLoading(true);
  
        const UserWantDeletePublicId = user?.profilePhotoPublicId;
        const { data } = await axios.delete(`/api/profileImage`, {
          data : {publicId: UserWantDeletePublicId,userId: user }
        });

        if(data?.success){
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
      <div className=" mt-16 pl-4">
        { public_id && (
          <Button className="mt-3 mb-1" onClick={onSubmit}>
            Click To Upload
          </Button>
        ) }

        <div className="flex gap-5 pl-8">
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

              console.log("info?.public_id: ", info?.public_id);
              console.log("info : ", info);
              // console.log("Info : ",info)
            }}
          >
            {({ open }) => {
              return (
                <button className=" rounded" onClick={() => open()}>
                  {/* Upload an Image */}
                  <ImageDown className=" text-neutral-500 cursor-pointer transition hover:text-white"/>
                  {/* Upload */}
                </button>
              );
            }}
          </CldUploadWidget>

          <div
            className={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500`}
            onClick={handleDelete}
          >
            <Trash2 size={20} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModal;
