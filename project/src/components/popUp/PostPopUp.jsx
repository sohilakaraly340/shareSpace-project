import React, { useContext, useEffect } from "react";
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

  const userName = localStorage.getItem("name");
  const userid = localStorage.getItem("userId");

  const onSubmit = async (values, actions) => {
    const body = {
      image: values.image,
      description: values.text,
      user: { _id: userid, name: userName },
    };
    editMood ? update(body) : AddPost(body);
    // console.log(body);
  };

  let { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: editMood
      ? {
          text: postToEdit.description,
          image: postToEdit.image,
        }
      : {
          text: "",
          image: "",
        },
    onSubmit,
    enableReinitialize: true,
  });
  // console.log(editMood, values, postToEdit);

  return popup ? (
    <>
      <div className="popup">
        <div className="popup_inner">
          <div className="flex w-10 items-center justify-center gap-3 mx-11 my-5">
            <img src={profile} />
            <h2>{userName}</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <textarea
              id="text"
              name="text"
              onChange={handleChange}
              value={values.text}
              onBlur={handleBlur}
              placeholder="What's on your mind?"
            ></textarea>
            <input
              id="image"
              name="image"
              onChange={handleChange}
              value={values.image}
              onBlur={handleBlur}
              type="text"
              placeholder="uplouad image"
            />
            <button
              className="btn my-10 mx-auto mb-5 px-10 block  py-3.5 bg-[#1b2327e9] text-white hover:scale-95"
              type="submit"
              disabled={
                (values.text === "" && values.image === "") || isLoading
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
