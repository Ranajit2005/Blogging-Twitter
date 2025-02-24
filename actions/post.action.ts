"use server"

import axios from "axios";

export const getPosts = async (loading:boolean ,limit: number) => {

    try {
        loading = true;

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts?limit=${limit}`);

        console.log("Data is from post.action.ts : ",data);
        return data;

    } catch (error) {
        
        console.log("user action error",error);
    }finally{
        loading = false;
    }
}
