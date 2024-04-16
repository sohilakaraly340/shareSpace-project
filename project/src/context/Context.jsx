import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [posts, setPosts] = useState([]);
  const [popup, setPopup] = useState(false);
  const [editMood, setEditMood] = useState(false);
  const [postToEdit, setPostToEdit] = useState({});
  const [user, setUser] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  /////////////////////////////////////////////////1
  const register = async (body) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3005/api/v1/user",
        { name: body.name, email: body.email, password: body.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response && response.data) {
        console.log(response.data);
        setRegistered(true);
        toast.success("You have to login now ");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Email already exists or server error");
    } finally {
      setIsLoading(false);
    }
  };

  ////////////////////////////////////////////////2
  const login = async (body) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:3005/api/v1/user/login",
        { email: body.email, password: body.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("name", data.user.name);
      setRegistered(true);
      toast.success("Login successfully ,Wellcom👋 ");
    } catch (error) {
      console.error("Error:", error.response.data.message);
      // const er = error.response.data.message;
      toast.error("Email not exist");
    } finally {
      setIsLoading(false);
    }
  };

  ///////////////////////////////////////////////3
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
        setPosts((prevPosts) => [...prevPosts, ...data.data]);
        setPage((prevPage) => prevPage + 1);
      }
      return data.data;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //////////////////////////////////////////////4
  const AddPost = async (body) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3005/api/v1/post",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            JWT: `${token}`,
          },
        }
      );
      console.log(body);

      const newPosts = [...posts];
      newPosts.unshift(body);
      setPosts(newPosts);
      console.log(newPosts);
      setPopup(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //////////////////////////////////////////////5
  const editPost = (post) => {
    setPopup(true);
    setEditMood(true);
    setPostToEdit(post);
  };

  const update = async (body) => {
    // setIsLoading(true);
    try {
      const { data } = await axios.patch(
        `http://localhost:3005/api/v1/post/${postToEdit._id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            JWT: `${token}`,
          },
        }
      );

      const newPosts = [...posts];
      const index = newPosts.findIndex((post) => post._id === postToEdit._id);
      newPosts[index] = {
        ...newPosts[index],
        image: body.image,
        description: body.description,
      };
      setPosts(newPosts);

      setPopup(false);
      setEditMood(false);
      setPostToEdit({});
      toast.success("Post edited ");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //////////////////////////////////////////////6
  const deletePost = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3005/api/v1/post/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            JWT: `${token}`,
          },
        }
      );
      const newPosts = [...posts];
      const updatePosts = newPosts.filter((post) => post._id !== id);
      setPosts(updatePosts);
      console.log(updatePosts);
      toast.success("Post deleted ");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getAllPosts();

    const fetchData = async () => {
      if (userId) {
        setRegistered(true);
        const userData = await getUser(userId);
        setUser(userData);
      }
    };

    fetchData();
  }, []);

  /////////////////////////////////////////////7
  const getUser = async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3005/api/v1/user/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            JWT: `${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  ////////////////////////////////////////////8

  ////////////////////////////////////////////9
  // const getAllFavPosts = async (userid) => {
  //   // setIsLoading(true);
  //   try {
  //     const { data } = await axios.get(
  //       `http://localhost:3005/api/v1/user/favourite/${userid}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           JWT: `${token}`,
  //         },
  //       }
  //     );
  //     console.log(data);
  //     // toast.success("ok ");
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  //   //  finally {
  //   //   setIsLoading(false);
  //   // }
  //   // getAllPosts();
  // };

  const AllContext = {
    isLoading,
    register,
    registered,
    setRegistered,
    login,
    posts,
    popup,
    setPopup,
    AddPost,
    deletePost,
    editPost,
    editMood,
    postToEdit,
    update,
    setPostToEdit,
    setEditMood,

    user,
    getAllPosts,
    hasMore,
  };

  return <Context.Provider value={AllContext}>{children}</Context.Provider>;
};
