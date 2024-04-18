import React, { useContext } from "react";
import { Context } from "../context/Context";
import Post from "../components/post/Post";
import InfiniteScroll from "react-infinite-scroll-component";

export default function FavouritePosts() {
  const { user, isLoading } = useContext(Context);

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

  if (!user.FavPosts || user.FavPosts.length === 0) {
    return (
      <h1 className="text-center font-semibold my-52 text-4xl">
        No favorite posts found.😥
      </h1>
    );
  } else {
    return (
      <div>
        <InfiniteScroll
          className="w-[80%] mx-auto"
          dataLength={user.FavPosts.length}
          // next={getUserPosts}
          // hasMore={hasMore}
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
          {user.FavPosts.map((post) => (
            <Post data={post} key={post._id} />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}
