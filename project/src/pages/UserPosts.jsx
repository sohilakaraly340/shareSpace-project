import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import Post from "../components/post/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import PostPopUp from "../components/popUp/PostPopUp";

export default function UserPosts() {
  const userId = localStorage.getItem("userId");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { posts } = useContext(Context);

  const getAllPosts = async () => {
    if (page === 1) {
      setIsLoading(true);
    }
    try {
      const { data } = await axios.get(
        `http://localhost:3005/api/v1/post?page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.data.length === 0) {
        setHasMore(false);
      } else {
        setPage((prevPage) => prevPage + 1);
        return data.data;
      }
      return data.data;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserPosts = async () => {
    try {
      const fetchedPosts = await getAllPosts();
      const userPosts = fetchedPosts.filter((post) => post.user._id === userId);
      setUserPosts((prevPosts) => [...prevPosts, ...userPosts]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, [posts]);

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

  if (userPosts.length === 0)
    return (
      <div className="text-center font-semibold my-52 text-4xl">
        No favorite posts found. 😥{" "}
        <p className="text-2xl my-7">Go and post now! </p>
      </div>
    );
  return (
    <div>
      <InfiniteScroll
        className="w-[80%] mx-auto"
        dataLength={userPosts.length}
        next={getUserPosts}
        hasMore={hasMore}
        loader={
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
        }
        endMessage={
          <p className="text-center font-bold text-xl my-3">No more posts.</p>
        }
      >
        {userPosts.map((post) => (
          <Post data={post} key={post._id} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
