// "use client"

import { getPosts } from "@/actions/post.action";
import GetPosts from "@/components/post/GetPosts"

export default async function Home() {

  let loading = false;
  const posts = await getPosts(loading, 10);

  return <GetPosts posts={posts} loading={loading} />;
  
}
