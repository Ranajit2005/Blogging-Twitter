"use client"

import { IUser } from '@/types'
import React, { useState } from 'react'

const EditModal = ({user}:{user:IUser}) => {

    const [isLoading,setIsLoading] = useState<boolean>(false);


  return (
    <div>
      Edit
    </div>
  )
}

export default EditModal
