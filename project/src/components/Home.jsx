import React, { useContext, useEffect } from "react";
import { Context } from "../context/Context";

import AddPost from "../icons/AddPost";
import PostPopUp from "./popUp/PostPopUp";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Post from "./post/Post";

export default function Home() {
  const { posts, isLoading, setPopup, getAllPosts, hasMore } =
    useContext(Context);
  const userName = localStorage.getItem("name");
  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="flex flex-col gap-4 w-1/2 pt-24 mx-auto">
        <div className="flex gap-4 items-center">
          <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
        <div className="skeleton h-60 w-full"></div>
      </div>
    );

  return (
    <div className="pt-20">
      <PostPopUp />
      <InfiniteScroll
        dataLength={posts.length}
        next={getAllPosts}
        hasMore={hasMore}
        loader={
          <h4 className="text-center font-bold text-xl my-3">Loading...</h4>
        }
        endMessage={
          <p className="text-center font-bold text-xl my-3">No more posts.</p>
        }
      >
        {posts.map((post) => (
          <Post data={post} key={post._id} />
        ))}
      </InfiniteScroll>
      <button
        onClick={() => {
          userName ? setPopup(true) : navigate("/login");
        }}
        className="bg-[#1b2327e9] border rounded-full p-4 flex justify-center fixed right-5 bottom-10 items-center text-gray-50  text-2xl"
      >
        <AddPost />
      </button>
    </div>
  );
}
