"use client";

import { IUser } from "@/types";
// import Image from "next/image";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { CldUploadWidget } from "next-cloudinary";
import { ImageDown, Loader2, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const ProfileHero = ({ user }: { user: IUser }) => {

  const [coverPhoto, setCoverPhoto] = useState("");
  const [coverPhotoPublic_id, setcoverPhotoPublic_id] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const currentUser = useSession();
  const { toast } = useToast();

  const onSubmitCoverPhoto = async () => {
    try {
      await axios.post("/api/coverImage", {
        coverPhoto,
        user,
        coverPhotoPublic_id,
      });

      // Note that here after submiting the post, we reset the image and public_id value
      setCoverPhoto("");
      setcoverPhotoPublic_id("");
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

  const handleDelete = async(event:any) => {
    event.stopPropagation();
  
      try {
        setIsLoading(true);
  
        const UserWantDeletePublicId = user?.coverPhotoPublicId;
        const { data } = await axios.delete(`/api/coverImage`, {
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
    <div className="h-44 relative bg-neutral-800">
      
      {user.coverPhoto ? (
        <img
          // fill
          src={user.coverPhoto}
          alt={user.name}
          style={{ objectFit: "cover" }}
          className="w-full h-full"
        />
      ) : (
        <img
          // fill
          src={"/images/cover-placeholder.png"}
          alt={user.name}
          style={{ objectFit: "cover" }}
          className="w-full h-full"
        />
      )}

      <div className="absolute z-10 text-black right-5 bottom-3">
        {currentUser?.data?.currentUser?.[0]?._id == user?._id && (
          <div className="relative ">
            {coverPhotoPublic_id && (
              <Button className="absolute right-1 bottom-[-3px]  mb-1 bg-blue-600 text-white  hover:bg-blue-900" onClick={onSubmitCoverPhoto}>
                SAVE
              </Button>
            )}

            <div className="flex gap-5 pl-8">
              <CldUploadWidget
                uploadPreset="twitter-app"
                options={{
                  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                }}
                onSuccess={({ event, info }) => {
                  if (event === "success") {
                    setcoverPhotoPublic_id(info?.public_id);
                    setCoverPhoto(info?.secure_url);
                  }

                }}
              >
                {({ open }) => {
                  return (
                    <button className=" rounded" onClick={() => open()}>
                      {/* Upload an Image */}
                      <ImageDown className=" text-black cursor-pointer transition hover:text-blue-500" />
                      {/* Upload */}
                    </button>
                  );
                }}
              </CldUploadWidget>

              {user?.coverPhotoPublicId && (
                <div
                  className={`flex flex-row items-center text-black gap-2 cursor-pointer transition hover:text-red-600`}
                  onClick={handleDelete}
                >
                  <Trash2 size={20} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="absolute  -bottom-10 sm:-bottom-16 left-2 sm:left-4">
        <Avatar className="w-20 h-20 sm:w-32 sm:h-32 border-2 border-black rounded-full">
          <AvatarImage src={user.profilePhoto} />
          <AvatarFallback className="text-5xl sm:text-7xl uppercase text-black bg-orange-400">
            {user.name[0]}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
    </>
  );
};

export default ProfileHero;
