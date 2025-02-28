import { IUser } from '@/types'
import React from 'react'
import EditModal from './EditModal'

const ProfileBio = ({user}:{user:IUser}) => {
  return (
    <>
      <EditModal user={user}  />
    </>
  )
}

export default ProfileBio
