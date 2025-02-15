"use client"

import { IPost, IUser } from '@/types';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useSession } from 'next-auth/react';
import ProfileImageUpload from './ProfileImageUpload';
import { Button } from '../ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';


interface Props{
    placeholder : string;
    user : IUser;
    setPosts : Dispatch<SetStateAction<IPost[]>>;
    postId?:string;
    isComment?:boolean; 
}

const From = ({placeholder, user, setPosts, postId, isComment } : Props) => {

    const router = useRouter();

    const[text,setText] = useState<string>("")
    const[isLoading,setIsLoading]= useState(false)
    const [image,setImage] = useState("")

    // console.log("The user name is :->",user[0]?.name[0].toUpperCase())
    // console.log("The user is :->",user)
    // console.log("The user is :->",user.profilePhoto)

    const { data } = useSession();
    if (!data?.user) {
        return null; // or some fallback UI
    }
    // console.log("The data image is : ",data?.user?.image)

    const onSubmit = async () => {
      try {
        setIsLoading(true);
        if(isComment){

        }else{
          const {data} = await axios.post("/api/post",{text,image,userId:user?._id})
        }


      } catch (error) {
        
      }
    }

    const handleImageUpload = (img : string) => {
      setIsLoading(true);
      setImage(img);


    }

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
    <div className="flex gap-4">
      {/* <Avatar> */}

        {user.profilePhoto == undefined?(
          <Avatar>
            <AvatarImage src={data?.user?.image} />
            <AvatarFallback>{data?.user?.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        ):(
            <Avatar>
            <AvatarImage src={user.profilePhoto} />
            <AvatarFallback>{user?.name[0].toUpperCase()}</AvatarFallback>
            {/* if user gives error, then use user[0].name[0].toUpperCase() */}
            </Avatar>
          )}
      {/* </Avatar> */}

      <div className="w-full">
        <textarea
          className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white h-[50px]"
          placeholder={placeholder}
          disabled={isLoading}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        ></textarea>

        <hr className="opacity-0 peer-focus:opacity-100 h-0.5 w-full border-neutral-800 transition" />

        {!isComment && (
          <ProfileImageUpload
            // image={image}
            // setImage={setImage}
            profileImage={image}
            onChange={(image: string) => handleImageUpload(image)}
            isPost={true}
          />

        )}

        <div className="mt-4 flex flex-row justify-end">

          <Button
            className="px-8"
            disabled={isLoading || !text}
            onClick={onSubmit}
          >
            {isComment ? "Reply" : "Post"}
          </Button>

        </div>
      </div>
    </div>
  </div>
  )
}

export default From
