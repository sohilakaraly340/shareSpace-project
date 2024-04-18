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
      <div className="flex justify-between pt-[100px] ">
        <div className=" fixed w-1/3">
          <div className="rounded-full mx-auto w-[200px] h-[200px] relative">
            <img src={profile} />
            <div className=" border-white border-2 bg-[#A7A9AE] w-fit p-3 rounded-full absolute bottom-1 right-3">
              <Edit h={"6"} w={"6"} hover={" text-yellow-50"} />
            </div>
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
            </div>
          )}

          <div className="mt-5 ">
            <NavLink
              to="posts"
              className={({ isActive }) =>
                isActive ? "font-bold" : " font-thin"
              }
            >
              <p className="border-2 py-5 px-12 w-3/4 text-start mx-auto">
                Your posts
              </p>
            </NavLink>
            <NavLink
              to="favourite"
              className={({ isActive }) =>
                isActive ? "font-bold" : " font-thin"
              }
            >
              <p className="border-2 py-5 px-12 w-3/4 text-start mx-auto border-t-0">
                Your favourite posts
              </p>
            </NavLink>
          </div>
        </div>
        <div className=" ml-[35%]  w-[100%]">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}
