"use server"

import axios from "axios"

export const getNotification = async (userId:string)=>{
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/notifications/${userId}`);

        return data;

    } catch (error) {
        console.log("Notification error : ",error);
    }


}