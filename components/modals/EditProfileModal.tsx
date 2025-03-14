"use client"

import useEditModal from '@/hooks/useEditModal';
// import React, { useState } from 'react'
import Modal from '../ui/modal';
// import { Loader2 } from 'lucide-react';
import { IUser } from '@/types';
import EditForm from '../users/EditForm';

const EditProfileModal = ({user}:{user:IUser}) => {

    const editModal = useEditModal();
    // const [isLoading,setIsLoading] = useState(false);

    const bodyContent = (
        <>
          {/* {isLoading && (
            <div className="absolute z-10 h-[300px] bg-black opacity-50 left-0 top-12 right-0 flex justify-center items-center">
              <Loader2 className="animate-spin text-sky-500" />
            </div>
          )} */}
    
          <EditForm user={user} />
        </>
      );
      return (
        <Modal
          body={bodyContent}
          isOpen={editModal.isOpen}
          onClose={editModal.onClose}
          isEditing
        />
      );
}

export default EditProfileModal
