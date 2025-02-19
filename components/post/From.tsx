"use client"

import { IPost, IUser } from '@/types';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useSession } from 'next-auth/react';
import ProfileImageUpload from './ProfileImageUpload';
import { Button } from '../ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';


interface Props{
    placeholder : string;
    user : IUser;
    setPosts : Dispatch<SetStateAction<IPost[]>>;
    postId?:string;
    isComment?:boolean; 
}

const From = ({placeholder, user, setPosts, postId, isComment } : Props) => {

    const router = useRouter();
    const { toast } = useToast();

    const[text,setText] = useState<string>("")
    const[isLoading,setIsLoading]= useState(false)
    const [image,setImage] = useState("")

    // console.log("The user name is :->",user[0]?.name[0].toUpperCase())
    // console.log("The user is form from pg1 :->",user)
    // console.log("The user is form from pg2 :->",user?.currentUser?.[0]?._id)

    // console.log("The user is :->",user.profilePhoto)

    const { data } = useSession();
    if (!data?.user) {
        return null; // or some fallback UI
    }
    // console.log("The data image is : ",data?.user?.image)

    // console.log("->",user)
    const onSubmit = async () => {
      try {
        setIsLoading(true);
        if(isComment){

        }else{
          const {data} = await axios.post("/api/posts",{text,image,userId:user?.currentUser?.[0]?._id})

          const newPost = {
            ...data,
            user,
            likes : 0,
            hasLiked : false,
            comments : 0,
          }

          setPosts((prev)=> [newPost,...prev] );
          setImage("");
        }

        setIsLoading(false);
        setText("");

      } catch (error) {
        setIsLoading(false);

        toast({
          title: "Error",
          description: "Something went wrong, please try again",
          variant: "destructive",
        });
      }
    }

    const handleImageUpload = (img : string) => {
      try {
        setIsLoading(true);
        setImage(img);

        router.refresh();
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
      
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
            <AvatarFallback>{user?.name?.[0]?.toUpperCase()}</AvatarFallback>
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
            image={image}
            setImage={setImage}
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
