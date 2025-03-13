"use server"

import { getAuthOptions } from "@/lib/authOptions";
import axios from "axios"

export const getUsers = async (limit: number) => {

    try {

        const session: any = await getAuthOptions();

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/users?limit=${limit}&userId=${session?.currentUser?.[0]?._id}`);

        return data;

    } catch (error) {

        console.log("user action error",error);
    }

}

export const getUsersById = async (userId:string) => {

    try {
        const session: any = await getAuthOptions();

        // console.log("Auth option --------->",session?.currentUser?.[0]?._id)

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/${userId}?currentUserId=${session?.currentUser?.[0]?._id}`);

        const updatedData = {
            ...data,
            user:{
                ...data.user,
                followers: data?.user.followers?.length || 0,
                following: data?.user.following?.length || 0,
                isFollowing: data?.user.followers?.includes(session?.currentUser?.[0]?._id?.toString() ) || false
            }
        }

        // console.log("--------------------",updatedData)
        return updatedData;

    } catch (error) {

        console.log("user action error",error);
    }

}

export const getCurrentUser = async () => {

    try {
        
        const session: any = await getAuthOptions();
        const currentUserId = session?.currentUser?.[0]?._id;
        // console.log("------------->",typeof(currentUserId))
        return currentUserId;

    } catch (error) {

        console.log("user action error for current user ",error);
    }

}
