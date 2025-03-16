import { getPostsById } from "@/actions/post.action";
import PostDetails from "@/components/post/PostDetails";
import React from "react";

const PostId = async ({ params }: { params: Promise<{ postId: string }> }) => {

    const { postId } = await params;
    // console.log("post id : ",postId)
    const responce = await getPostsById(postId);
    // console.log("From post detils->",responce?.post,"---",responce?.comments)

  return <PostDetails getPost={responce?.post} postComments={responce?.comments} postId={postId}/>
};

export default PostId;
