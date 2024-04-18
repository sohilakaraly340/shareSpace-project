import React, { useContext } from "react";
import { Context } from "../context/Context";
import { NavLink } from "react-router-dom";
import profile from "../assets/profile.png";
import "./Nav.css";
export default function Nav() {
  const userName = localStorage.getItem("name");
  const { registered, setRegistered } = useContext(Context);

  const logout = () => {
    localStorage.clear();
    setRegistered(false);
  };

  return (
    <>
      <div className="bg-[#2F363A] px-11 py-5 fixed w-screen mt-0 flex justify-between items-center z-40 shadow-lg">
        <NavLink to="/">
          <p className="text-white text-3xl font-semibold ">
            Share<p className="text-stone-400 inline">Space</p>
          </p>
        </NavLink>
        {registered ? (
          <div className="flex justify-center items-center gap-7">
            <NavLink
              to="/profile/posts"
              className="flex justify-center items-center gap-3"
            >
              <img src={profile} className="w-[10%]" />
              <p className="text-gray-50 ">Welcome , {userName}</p>
            </NavLink>
            <button
              onClick={() => {
                logout();
              }}
              className="bg-gray-50 text-[#1b2327e9] px-5 border rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <NavLink to="/login">
            <button className="bg-gray-50 text-[#1b2327e9] px-5 border rounded">
              Login
            </button>
          </NavLink>
        )}
      </div>

      <div className="drawer ">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col ">
          <div className="w-full navbar bg-[#2F363A] px-11 py-5 fixed  mt-0 flex justify-between items-center z-40 shadow-lg">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">
              <NavLink to="/">
                <p className="text-white text-3xl font-semibold ">
                  Share<p className="text-stone-400 inline">Space</p>
                </p>
              </NavLink>
            </div>
            <div className="flex-none hidden lg:block">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered w-24 md:w-auto"
                />
              </div>
              {registered ? (
                <div className="flex justify-center items-center ">
                  <NavLink
                    to="/profile/posts"
                    className="flex justify-center items-center gap-3"
                  >
                    <img src={profile} className="w-[10%]" />
                    <p className="text-gray-50 ">Welcome , {userName}</p>
                  </NavLink>
                  <button
                    onClick={() => {
                      logout();
                    }}
                    className="bg-gray-50 text-[#1b2327e9] px-5 border rounded"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <NavLink to="/login">
                  <button className="bg-gray-50 text-[#1b2327e9] px-5 border rounded">
                    Login
                  </button>
                </NavLink>
              )}
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 pt-32 w-80 min-h-full bg-[#2F363A] ">
            <li className="text-white">
              <a>Sidebar Item 1</a>
            </li>
            <li className="text-white">
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
