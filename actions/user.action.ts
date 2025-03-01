"use server"

import { getAuthOptions } from "@/lib/authOptions";
import axios from "axios"

export const getUsers = async (limit: number) => {

    try {

        const session: any = await getAuthOptions();
        // const userId = session?.currentUser?.[0]?._id;
        // console.log(session);

        // console.log("userid : ",userId);
        

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/users?limit=${limit}?userId=${session?.currentUser?.[0]?._id}`);

        // console.log("Data is : ",data);

        return data;

    } catch (error) {

        console.log("user action error",error);
    }

}

export const getUsersById = async (userId:string) => {

    try {
        
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/${userId}`);

        // console.log("Data is :->",typeof(data));

        return data;

    } catch (error) {

        console.log("user action error",error);
    }

}


export const getCurrentUser = async () => {

    try {
        
        const session: any = await getAuthOptions();
        const currentUserId = session?.currentUser?.[0]?._id;
        console.log("------------->",typeof(currentUserId))
        return currentUserId;

    } catch (error) {

        console.log("user action error for current user ",error);
    }

}


