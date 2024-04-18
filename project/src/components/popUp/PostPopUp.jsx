import React, { useContext, useEffect, useState } from "react";
import "./Popup.css";
import { Context } from "../../context/Context";
import profile from "../../assets/profile.png";
import { useFormik } from "formik";

export default function PostPopUp() {
  const {
    popup,
    setPopup,
    AddPost,
    isLoading,
    editMood,
    postToEdit,
    update,
    setEditMood,
    setPostToEdit,
  } = useContext(Context);
  const [image, setImage] = useState(null);

  const userName = localStorage.getItem("name");
  const userid = localStorage.getItem("userId");

  const onSubmit = (values, actions) => {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append("title", values.title);
    formData.append("description", values.text);
    formData.append("user", userid);

    editMood ? update(formData) : AddPost(formData);
  };

  const fileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  let { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: editMood
      ? {
          text: postToEdit.description,
          title: postToEdit.title,
        }
      : {
          text: "",
          title: "",
        },
    onSubmit,
    enableReinitialize: true,
  });

  return popup ? (
    <>
      <div className="popup">
        <div className="popup_inner">
          <div className="flex w-10 items-center justify-center gap-3 mx-11 my-5">
            <img src={profile} alt="Profile" />
            <h2>{userName}</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              className="border border-gray-600 w-[80%]"
              id="title"
              name="title"
              onChange={handleChange}
              value={values.title}
              onBlur={handleBlur}
              type="text"
              placeholder="Title"
            />
            <textarea
              className="border border-gray-600 w-[80%]"
              id="text"
              name="text"
              onChange={handleChange}
              value={values.text}
              onBlur={handleBlur}
              placeholder="What's on your mind?"
            ></textarea>

            <input
              type="file"
              onChange={fileChange}
              name="image"
              className="file-input w-full max-w-xs p-0"
            />

            <button
              className="btn my-10 mx-auto mb-5 px-10 block  py-3.5 bg-[#1b2327e9] text-white hover:scale-95"
              type="submit"
              disabled={
                values.title === "" || values.description === "" || isLoading
              }
            >
              {editMood ? " Update Post" : "Add Post"}
            </button>
          </form>

          <div
            className="closeBtn"
            onClick={() => {
              setPopup(false);
              setEditMood(false);
              setPostToEdit({});
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  ) : (
    ""
  );
}
