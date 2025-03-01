import { IUser } from '@/types'
import React from 'react'
import EditModal from './EditModal'

const ProfileBio = ({user}:{user:IUser}) => {
  return (
    <>
      <div className='relative'>
        
      <EditModal user={user}  />
      </div>
    </>
  )
}

export default ProfileBio
