import React, { useContext } from "react";
import { Context } from "../context/Context";
import Post from "./post/Post";

export default function FavouritePosts() {
  const { user } = useContext(Context);

  if (!user) {
    // Render a loading indicator or return null if user data is not available yet
    return <h1>loading</h1>;
  }

  return (
    <>
      {/* {user.FavPosts.map((post) => (
        <Post data={post} key={post._id} />
      ))} */}
    </>
  );
}
