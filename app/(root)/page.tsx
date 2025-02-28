// "use client"

import { getPosts } from "@/actions/post.action";
import GetPosts from "@/components/post/GetPosts"
// import { useRouter } from "next/navigation";


export default async function Home() {

  // const { router } = useRouter();

  const loading = false;
  const posts = await getPosts(loading, 10);

  // console.log("1st time ost value is : ",posts)
  // In deploy app, when I open it for 1st time, it does not show any data. But after refresh it shows data. For this issue I use it.
  if(!posts) return null;

  return <GetPosts posts={posts} loading={loading} />;
  
}
