import { IUser } from '@/types'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const User = ({ user }:{user: IUser}) => {
  return (
    <div>
      <div>
      <Avatar>
          <AvatarImage src={user.profilePhoto} />
          <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
        </Avatar>

        {/* <div className="flex flex-col">
          <p className="text-white font-semibold text-sm line-clamp-1">
            {user.name}
          </p>
          <p className="text-neutral-400 text-sm line-clamp-1">
            {user.username
              ? `@${sliceText(user.username, 16)}`
              : sliceText(user.email, 16)}
          </p>
        </div> */}
      </div>
    </div>
  )
}

export default User
