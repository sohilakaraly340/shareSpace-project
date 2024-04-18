import React, { useContext } from "react";
import Edit from "../icons/Edit";
import { Context } from "../context/Context";
import profile from "../assets/profile.png";
import { NavLink, Outlet } from "react-router-dom";
import PostPopUp from "../components/popUp/PostPopUp";

export default function Profile() {
  const { user, isLoading } = useContext(Context);
  return (
    <>
      <PostPopUp />
      <div className="md:flex justify-between pt-[100px] ">
        <div className=" md:fixed md:w-1/3">
          <div className="flex justify-center gap-5 md:block">
            <div className="rounded-full md:mx-auto w-[100px] md:w-[200px] md:h-[200px] relative">
              <img src={profile} />
              <label
                htmlFor="profileImageInput"
                className="border-white border-2 bg-[#A7A9AE] w-fit p-3 rounded-full absolute bottom-[-5px] right-[-10px] md:bottom-1 md:right-3 cursor-pointer"
              >
                <Edit h={"6"} w={"6"} hover={" text-yellow-50"} />
                <input
                  type="file"
                  id="profileImageInput"
                  className="hidden"
                  // onChange={handleImageChange}
                />
              </label>
            </div>
            {isLoading ? (
              <div className="flex flex-col gap-4 my-11 w-1/2">
                <div className="skeleton h-2 w-32 mx-48"></div>
                <div className="skeleton h-2 w-32 mx-48"></div>
              </div>
            ) : (
              <div>
                <p className="text-center text-2xl my-3 font-semibold">
                  {user.name}
                </p>
                <p className="text-center text-gray-600">{user.email}</p>

                <p className="text-center mt-3 font-semibold">
                  {user.following?.length || 0}
                  <p className="inline font-normal pr-3"> Following</p>{" "}
                  {user.followers?.length || 0}{" "}
                  <p className="inline font-normal"> Followers</p>
                </p>
              </div>
            )}
          </div>

          <div className="mt-5 flex justify-center md:block">
            <NavLink
              to="posts"
              className={({ isActive }) =>
                isActive ? "font-bold" : " font-thin"
              }
            >
              <p className="border-2 p-5 md:px-12 md:w-3/4 text-start md:mx-auto">
                Your posts
              </p>
            </NavLink>
            <NavLink
              to="favourite"
              className={({ isActive }) =>
                isActive ? "font-bold" : " font-thin"
              }
            >
              <p className="border-2 py-5 px-5 md:px-12 md:w-3/4 text-start md:mx-auto md:border-t-0">
                Your favourite posts
              </p>
            </NavLink>
          </div>
        </div>
        <div className=" md:ml-[35%]  w-[100%]">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}
