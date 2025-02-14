import React, { useState } from 'react'
import { useDropezone } from 'react-dropzone'

interface Props{
    profileImage: string,
    onChange: (profileImage: string) => void,
    isPost?: boolean
}

const ProfileImageUpload = ( {profileImage, onChange, isPost} : Props ) => {

    const [image,setImage] = useState(profileImage);

  return (
    <div>
      Image
    </div>
  )
}

export default ProfileImageUpload
