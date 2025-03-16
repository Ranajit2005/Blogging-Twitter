"use server"

// import { getAuthOptions } from "@/lib/authOptions";
import axios from "axios";

export const getPosts = async (loading:boolean ,limit: number) => {

    try {
        loading = true;

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts?limit=${limit}`);

        return data;

    } catch (error) {
        
        console.log("user action error",error);
    }finally{
        loading = false;
    }
}

export const getPostsById = async (postId: string) => {

    try {
        // const session:any = getAuthOptions();
        // console.log("The post is --------------: ",postId)
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts/${postId}`);
        // console.log("data is : -> ",data)
        return data;

    } catch (error) {
        
        console.log("user action error",error);
    }
}
