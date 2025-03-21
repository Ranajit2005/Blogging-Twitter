"use client"

import { IPost } from "@/types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDistanceToNowStrict } from "date-fns";
import CommentItem from "./CommentItem";
import From from "./From"

const PostDetails = ({
  getPost,
  postComments,
  postId,
}: {
  getPost: IPost;
  postComments: any;
  postId: string;
}) => {
  const { data: session, status }: any = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingComment, setIsFetchingComment] = useState(false);
  const [post, setPost] = useState<IPost | null>(getPost);
  const [comments, setComments] = useState<IPost[]>(postComments);

  useEffect(() => {
    setPost(getPost);
    setComments(postComments);
  }, [getPost, postComments]);


//   console.log(session)

  return (
    <>
      <Header title="Post Details" isBack />
      {isLoading || status === "loading" ? (
        <div className="flex justify-center items-center h-24">
          <Loader2 className="animate-spin text-sky-500" />
        </div>
      ) : (
        <>
          <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer bg-neutral-900 transition">
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <Avatar>
                  <AvatarImage src={post?.user.profilePhoto} />
                  <AvatarFallback className="capitalize">
                    {post?.user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="w-full flex flex-row items-center gap-5 justify-between">
                  <p className="text-white font-semibold cursor-pointer hover:underline">
                    {post?.user.name}
                  </p>
                  
                  <span className="text-neutral-500 text-sm">
                    {post &&
                      post.createdAt &&
                      formatDistanceToNowStrict(new Date(post.createdAt))} ago
                  </span>
                </div>
              </div>
              <div>
                <div className="text-white mt-1">{post?.text}</div>
                <div className="h-80 w-full">
                  <img
                    src={post?.image}
                    alt={post?.text}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
          <From
            placeholder="Comment here..."
            user={JSON.parse(JSON.stringify(session))}
            setPosts={setComments}
            postId={postId}
            isComment
          />

          {isFetchingComment ? (
            <div className="flex justify-center items-center h-24">
              <Loader2 className="animate-spin text-sky-500" />
            </div>
          ) : comments?.length > 0 ? (
            comments.map((comment) => (
              <CommentItem
                comment={comment}
                key={comment._id}
                user={JSON.parse(JSON.stringify(session))}
                setComments={setComments}
                comments={comments}
                postId={postId}
              />
            ))
          ) : (
            <p className="text-neutral-500 text-center my-3">No comments yet!</p>
          )}
        </>
      )}
    </>
  );
};

export default PostDetails;
