"use client"

import React, { useEffect, useState } from 'react'
import Header from './common/Header';
import Image from 'next/image';
import { Button } from './ui/button';
import axios from 'axios';

const GetNotifications = ({data,userId}: {data:any,userId:string}) => {

    const [notifications, setNotifications] = useState(data || []);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setNotifications(data);
    }, [data]);

    const handleClear = async () => {
        try {
          setIsLoading(true);
          await axios.delete(`/api/notifications/${userId}`);
          setIsLoading(false);
          setNotifications([]);
        } catch (error) {
          setIsLoading(false);
        }
    }

  return (
    <>

    <div className=' pr-3 sm:pr-5 flex justify-around border-b-[1px] border-neutral-800'>
      <Header isBack title="Notifications" />
    
        {notifications?.length > 0 && (
        <div className="mt-4 flex justify-center">
          <Button disabled={isLoading} onClick={handleClear}>
            Clear All
          </Button>
        </div>
      )}
        
    </div>

      <div>
        {notifications.length > 0 ? (
          notifications?.map((notification: any) => (
            <div
              className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
              key={notification._id}
            >
              <Image alt="logo" src={"/images/x.svg"} width={32} height={32} />
              <p className="text-white">{notification?.text}</p>
            </div>
          ))
        ) : (
          <div className="text-neutral-600 text-center p-6 text-xl">
            No notifications
          </div>
        )}
      </div>
      
    </>

  )
}

export default GetNotifications
