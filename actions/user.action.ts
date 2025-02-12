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

        console.log("Data is : ",data);

        return data;

    } catch (error) {

        console.log("user action error",error);
    }

}
