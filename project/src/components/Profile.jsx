import React, { useContext } from "react";
import Edit from "../icons/Edit";
import { Context } from "../context/Context";
import profile from "../assets/profile.png";
import { NavLink, Outlet } from "react-router-dom";
import PostPopUp from "./popUp/PostPopUp";

export default function Profile() {
  const { user } = useContext(Context);

  return (
    <>
      <PostPopUp />

      <div className="grid grid-cols-7 pt-[100px]">
        <div className="col-span-2">
          <div className="rounded-full mx-auto w-[200px] h-[200px] relative">
            <img src={profile} />
            <div className=" border-white border-2 bg-[#A7A9AE] w-fit p-3 rounded-full absolute bottom-1 right-3">
              <Edit h={"6"} w={"6"} hover={" text-yellow-50"} />
            </div>
          </div>
          <div>
            <p className="text-center text-2xl my-3 font-semibold">
              {user.name}
            </p>
            <p className="text-center text-gray-600">{user.email}</p>
          </div>

          <div className="mt-5 ">
            <NavLink to="posts">
              <p className="border-2 py-5 px-12 w-3/4 text-start mx-auto">
                your posts
              </p>
            </NavLink>
            <NavLink to="favourite">
              <p className="border-2 py-5 px-12 w-3/4 text-start mx-auto border-t-0">
                your favourite posts
              </p>
            </NavLink>
          </div>
        </div>
        <div className="col-span-5">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}
