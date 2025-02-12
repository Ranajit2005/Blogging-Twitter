"use client"

import { IPost } from '@/types'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import { Loader2 } from 'lucide-react'

const GetPosts = ({
    posts,
    loading,
}: {
    posts:IPost[],
    loading:boolean
}) => {

    const [postList, setPostList ] = useState(posts);
    const { data:session , status }:any = useSession();

    useEffect(()=>{
        setPostList(posts);
    },[posts])


  return (
    <>
      <Header title = "Home"/>

      {loading || status === "loading" ? (
        <div className='flex justify-center items-center h-24'>
          <Loader2 className='animate-spin text-sky-500'/>
        </div>
      ):(
        <></>
      )}


    </>
  )
}

export default GetPosts
