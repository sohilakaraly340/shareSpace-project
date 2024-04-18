import React, { useContext } from "react";
import { Context } from "../context/Context";
import { NavLink, useNavigate } from "react-router-dom";
import profile from "../assets/profile.png";

export default function Nav() {
  const userName = localStorage.getItem("name");
  const { registered, setRegistered, searchText, handleSearch } =
    useContext(Context);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setRegistered(false);
    navigate("/", { replace: true });
  };

  return (
    <div className="bg-[#2F363A] p-5 md:px-11 md-py-5 fixed w-screen mt-0 flex justify-between items-center z-40 shadow-lg">
      <NavLink to="/">
        <p className="text-white text-xl md:text-3xl font-semibold ">
          Share<p className="text-stone-400 inline">Space</p>
        </p>
      </NavLink>
      <div className="flex justify-end items-center gap-3">
        <div class="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input m-0 input-bordered w-24 md:w-60"
            value={searchText}
            onChange={(e) => handleSearch(e)}
          />
        </div>
        {registered ? (
          <div className="flex justify-center items-center gap-7">
            <NavLink
              to="/profile/posts"
              className="flex justify-end items-center w-[40px] md:w-[195px] gap-3"
            >
              <img src={profile} className="md:w-[20%]" />
              <p className=" hidden md:inline-block text-gray-50 ">
                Welcome , {userName}
              </p>
            </NavLink>
            <button
              onClick={() => {
                logout();
              }}
              className="bg-gray-50 text-[#1b2327e9] hidden md:block px-5 py-2 border rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <NavLink to="/login">
            <button className="bg-gray-50 text-[#1b2327e9] px-5 py-2 border rounded">
              Login
            </button>
          </NavLink>
        )}
      </div>
    </div>
  );
}
