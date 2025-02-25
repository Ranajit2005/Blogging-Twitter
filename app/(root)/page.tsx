// "use client"

import { getPosts } from "@/actions/post.action";
import GetPosts from "@/components/post/GetPosts"
// import { useRouter } from "next/navigation";


export default async function Home() {

  // const { router } = useRouter();

  let loading = false;
  const posts = await getPosts(loading, 10);

  console.log("1st time ost value is : ",posts)

  if(!posts) return null;

  return <GetPosts posts={posts} loading={loading} />;
  
}
