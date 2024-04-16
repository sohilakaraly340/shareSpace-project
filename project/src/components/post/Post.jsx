import React, { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import Delete from "../../icons/Delete";
import Edit from "../../icons/Edit";
import "./Post.css";
import axios from "axios";
import toast from "react-hot-toast";
import profile from "../../assets/profile.png";

export default function Post({ data }) {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const { deletePost, editPost, registered } = useContext(Context);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleDelete = () => {
    setConfirmPopup(true);
  };

  const handleConfirm = () => {
    deletePost(data._id);
    setConfirmPopup(false);
  };

  const handleCancel = () => {
    setConfirmPopup(false);
  };

  const handleEditPost = useCallback(() => {
    console.log(data._id);
    editPost(data);
  }, [editPost, data]);

  const toggleFav = async () => {
    if (token) {
      try {
        const res = await axios.post(
          `http://localhost:3005/api/v1/user/favourite/${userId}/${data._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              JWT: `${token}`,
            },
          }
        );
        if (isClicked) toast.success("Removed from favorite");
        else toast.success("Added to favorite");
        setIsClicked(!isClicked);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      toast.error("You need to logIn first");
    }
  };

  useEffect(() => {
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

    const fetchData = async () => {
      try {
        const userData = await getUser(userId);
        if (userData.FavPosts.some((post) => post._id === data._id))
          setIsClicked(true);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (userId) fetchData();
  }, []);

  useEffect(() => {
    if (!registered) setIsClicked(false);
  }, [registered]);
  return (
    <>
      {confirmPopup && (
        <>
          <div className="overlay"></div>
          <div className="confirmPopup">
            <p className="text-center font-bold text-xl my-5">
              Are you sure you want to delete this post?
            </p>
            <div className="flex justify-center my-16 gap-7">
              <button
                className="btn w-28 bg-red-600 text-white hover:bg-red-500"
                onClick={() => {
                  handleConfirm();
                }}
              >
                Delete
              </button>
              <button
                className="btn w-28 "
                onClick={() => {
                  handleCancel();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
      <div className="border border-slate-600 mx-auto my-5 p-5 w-1/2 relative">
        <div className="absolute right-3 ">
          {data.user._id == userId && (
            <p
              className="mb-2"
              onClick={() => {
                handleDelete();
              }}
            >
              <div className="tooltip tooltip-right" data-tip="delete">
                <Delete />
              </div>
            </p>
          )}
          {data.user._id == userId && (
            <p
              className="mb-2"
              onClick={() => {
                handleEditPost();
              }}
            >
              <div className="tooltip tooltip-right" data-tip="edit">
                <Edit h={"5"} w={"5"} hover={"text-cyan-600"} />
              </div>
            </p>
          )}

          <p
            className="mb-2"
            onClick={() => {
              toggleFav();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-6 h-6 cursor-pointer ${
                isClicked ? "fill-red-600" : ""
              } hover:fill-red-600 stroke-red-600`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </p>
        </div>
        <div className="flex gap-3 items-center ">
          <img className="w-[5%]" src={profile} />
          <p className="text-lg font-semibold">{data.user.name}</p>
        </div>

        {data.description && (
          <div className="my-5 mx-8">{data.description}</div>
        )}
        {data.image && <img src={data.image} className="mt-10" />}
      </div>
    </>
  );
}
