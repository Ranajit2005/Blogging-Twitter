import { getNotification } from '@/actions/notification.action';
import GetNotifications from '@/components/GetNotifications';
import React from 'react'

const Notifications = async ({params}: {
        params: Promise<{ userId: string }>;
}) => {

    const { userId } = await params;
    const response = await getNotification(userId);
    // console.log("->",response)

  return <GetNotifications data={response} userId={userId}/>
}

export default Notifications
