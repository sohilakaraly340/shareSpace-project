import React, { useContext } from "react";
import { Context } from "../context/Context";
import { NavLink } from "react-router-dom";
import profile from "../assets/profile.png";

export default function Nav() {
  const userName = localStorage.getItem("name");
  const { registered, setRegistered } = useContext(Context);

  const logout = () => {
    localStorage.clear();
    setRegistered(false);
  };

  return (
    <div className="bg-[#2F363A] px-11 py-5 fixed w-screen mt-0 flex justify-between items-center z-40 shadow-lg">
      <NavLink to="/">
        <p className="text-white text-3xl font-semibold ">
          Share<p className="text-stone-400 inline">Space</p>
        </p>
      </NavLink>
      {registered ? (
        <div className="flex justify-center items-center gap-7">
          <NavLink
            to="/profile"
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
  );
}
