import { Edit2 } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface Props{
    profileImage: string,
    onChange: (profileImage: string) => void,
    isPost?: boolean
}

const ProfileImageUpload = ( {profileImage, onChange, isPost} : Props ) => {

    const [image,setImage] = useState(profileImage);

    const handleChange = useCallback((coverImage:string)=>{
      onChange(coverImage)
    },[onChange])

    const handleDrop = useCallback((files:any)=>{

      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        setImage(event.target.result);
        handleChange(event.target?.result)
      };

      reader.readAsDataURL(file);

    },[handleChange])

    const {getInputProps, getRootProps } = useDropzone({
      maxFiles : 1,
      onDrop : handleDrop,
      accept : {
        "image/jpeg" : [],
        "image/png" : [],
      }
    })

  return (
    <div
      {...getRootProps({
          className: "text-white text-center border-none rounded-md",
      })}
    >
      <input {...getInputProps()} />

      {/* <input {...getInputProps()} /> */}
      {image ? (
        isPost ? (
          <div className="relative transition cursor-pointer w-full h-80 border-4 border-black">
            <Image
              src={image}
              fill
              alt="Uploaded image"
              style={{ objectFit: "cover", borderRadius: "10px" }}
            />
            <div className="absolute inset-0 flex justify-center items-center">
              <Edit2 size={24} className={"text-white"} />
            </div>
          </div>
        ) : isCover ? (
          <div className="h-44 relative bg-neutral-800">
            <Image
              fill
              src={image}
              alt="{user.name}"
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div className="relative -top-20 left-6 rounded-full transition cursor-pointer w-32 h-32 border-4 border-black">
            <Image
              src={image}
              fill
              alt="Uploaded image"
              style={{ objectFit: "cover", borderRadius: "100%" }}
            />
            <div className="absolute inset-0 rounded-full flex justify-center items-center">
              <Edit2 size={24} className={"text-white"} />
            </div>
          </div>
        )
      ) : isPost ? (
        <div className="relative">
          <ImageDown className="absolute top-8" />
        </div>
      ) : isCover ? (
        <div className="h-44 relative bg-neutral-800">
          <Image
            fill
            src={"/images/cover-placeholder.png"}
            alt="{user.name}"
            style={{ objectFit: "cover" }}
          />
        </div>
      ) : (
        <div className="relative -top-20 left-6">
          <div
            className={`rounded-full transition cursor-pointer relative w-32 h-32 border-4 border-black`}
          >
            <Image
              fill
              style={{ objectFit: "cover", borderRadius: "100%" }}
              alt="Avatar"
              src={"/images/placeholder.png"}
            />
            <div className="absolute inset-0  bg-black/40 rounded-full flex justify-center items-center">
              <Download size={40} className={"text-black"} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileImageUpload
