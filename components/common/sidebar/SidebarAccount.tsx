"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
// import { IUser } from '@/types';
import { Loader2, LogOut, MoreHorizontal } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import React from "react";

interface Props {
    user : IUser
}

const SidebarPostButton = (user:Props) => {
  const { data, status } = useSession();
  const currentUser = useSession()
  // console.log("------------->",currentUser?.data?.currentUser?.[0]?.username?.[0]?.toUpperCase())

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="animate-spin text-sky-500" />
      </div>
    );
  }

  // Ensure `data.user` exists before accessing it
  if (!data?.user) {
    return null; // or some fallback UI
  }

  // console.log("The data image is : ",user)

  return (
    <>
      {/* for mobile  */}
      <div
        className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-red-500 hover:bg-opacity-80 transition cursor-pointer"
        onClick={() => signOut()}
      >
        <LogOut size={24} color="white" />
      </div>

      {/* for desktop */}

      <Popover>
        <PopoverTrigger asChild>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src={currentUser?.data?.currentUser?.[0]?.profilePhoto} />
                <AvatarFallback>{currentUser?.data?.currentUser?.[0]?.username?.[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className=" hidden lg:block  items-start text-white">
                <p>{data?.user?.name}</p>
                {data?.user?.name ? (
                  <p className="opacity-40">@{data?.user?.name}</p>
                ) : (
                  <p className="opacity-40">Manage account</p>
                )}
              </div>
            </div>
            <MoreHorizontal size={24} color="white" className="hidden lg:block"/>
          </div>
        </PopoverTrigger>

        <PopoverContent className="bg-black border border-gray-600 rounded-2xl px-0 mb-3">
          <div
            className="font-bold text-white cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 p-4 transition"
            onClick={() => signOut()}
          >
            Log out{" "}
            {data?.user?.name ? `@${data?.user?.name}` : data?.user?.name}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default SidebarPostButton;
