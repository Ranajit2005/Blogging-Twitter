import { getUsersById } from '@/actions/user.action';
import Header from '@/components/common/Header'
import ProfileBio from '@/components/users/ProfileBio';
import ProfileHero from '@/components/users/ProfileHero';
import React from 'react'

const ProfileUser = async ({
    params,
}:{
    params: Promise<{userId:string}>
}) => {

    const { userId } = await params;
    const getUserDetails = await getUsersById(userId);


  return (
    <>
      <Header title=""/>
      <ProfileHero user = {JSON.parse(JSON.stringify(getUserDetails?.user))}/>
      <ProfileBio user = {JSON.parse(JSON.stringify(getUserDetails?.user))  }/>
    </>
  )
}

export default ProfileUser
