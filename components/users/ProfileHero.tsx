import { IUser } from '@/types'
import Image from 'next/image'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const ProfileHero = ({user}:{user:IUser}) => {
  return (
    <div className="h-44 relative bg-neutral-800">
      {user.coverPhoto ? (
        <Image
          fill
          src={user.coverPhoto}
          alt={user.name}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <Image
          fill
          src={"/images/cover-placeholder.png"}
          alt={user.name}
          style={{ objectFit: "cover" }}
        />
      )}

      <div className="absolute -bottom-16 left-4">
        <Avatar className="w-32 h-32">
          <AvatarImage src={user.profilePhoto} />
          <AvatarFallback className="text-7xl uppercase  bg-orange-400">
            {user.name[0]}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default ProfileHero
