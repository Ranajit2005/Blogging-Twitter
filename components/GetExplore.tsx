"use client"

import { IUser } from '@/types'
import React, { ChangeEvent, useState } from 'react'
import Header from './common/Header'
import { Input } from './ui/input'
import { Loader2, Search } from 'lucide-react'
import { debounce } from 'lodash'
import axios from 'axios'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { sliceText } from '@/lib/utils'
import Link from 'next/link'

const GetExplore = ({users}:{users:IUser[] }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [getUsers, setUsers] = useState<IUser[]>(users);

    const handleSearch = async (event:ChangeEvent<HTMLInputElement>) => {

        const text = event.target.value;

        if(text && text?.length > 2){
            try {
                setIsLoading(true);
                const {data} = await axios.get(`/api/users/search/${text}`);
                setUsers(data);
                setIsLoading(false);
            } catch (error) {
                console.log("Explore error",error);
            }
        }

    }

    const deboiuncedSearch = debounce(handleSearch,500)


  return (
    <>
        <Header isBack title="Explore" />
        <div className="relative">
        <Input
          onChange={deboiuncedSearch}
          placeholder="Search for users"
          className="mt-2 w-[98%] mx-auto block border-none bg-neutral-900 text-white"
        />

        <div className="absolute rounded-md h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 right-2 top-1/2 -translate-y-1/2 cursor-pointer">
          <Search className="text-white" size={28} />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-24">
          <Loader2 className="animate-spin text-sky-500" />
        </div>
      ) : (
        <>
          {users.length === 0 && (
            <div className="text-neutral-600 text-center p-6 text-xl">
              No users found
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 mt-6">
            {getUsers.map((user) => (
              <Link key={user._id} href={`/profile/${user._id}`}>
                <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition relative mr-4">
                  <div className="flex flex-row gap-4">
                    <Avatar>
                      <AvatarImage src={user.profilePhoto} />
                      <AvatarFallback className="capitalize">
                        {user.name[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <p className="text-white font-semibold cursor-pointer capitalize">
                        {user.name}
                      </p>

                      <span className="text-neutral-500 cursor-pointer md:block">
                        {user.username
                          ? `@${sliceText(user.username, 16)}`
                          : sliceText(user.email, 16)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default GetExplore
