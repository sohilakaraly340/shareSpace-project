import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import "./Auth.css";
import * as Yup from "yup";
import svg from "../../assets/login.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";

export default function Login() {
  const { login, isLoading } = useContext(Context);
  const navigate = useNavigate();
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

  const onSubmit = async (values, actions) => {
    await login(values);
    if (localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
  };
  const toggleLoginFormVisibility = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
    setTimeout(() => {
      navigate("/register");
    }, 200);
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Required"),
    password: Yup.string()
      .min(8)
      .matches(/[a-zA-Z]/)
      .required("Required"),
  });
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: validationSchema,
      onSubmit,
    });

  return (
    <div className="parent grid grid-cols-7">
      <form
        onSubmit={handleSubmit}
        className={`bg-[#1b2327e9] col-span-4 px-24  form-container ${
          isLoginFormVisible ? "" : "move-right"
        }`}
      >
        <p className="text-3xl font-semibold text-white pt-24 ">
          Share<p className="text-stone-400 inline">Space</p>
        </p>
        <p className="text-white font-bold pt-10  pb-5  text-3xl">
          Welcome Back!
        </p>
        <h3 className="text-white font-light pb-3  text-2xl">
          LogIn to your account
        </h3>
        <label
          className={`input input-bordered flex items-center gap-2 mt-8 mb-3 ${
            errors.email && touched.email ? " border border-red-600 shake" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            className="grow p-0"
            placeholder="Email"
          />
        </label>
        {errors.email && touched.email && (
          <p className="text-red-600">{errors.email}</p>
        )}

        <label
          className={`input input-bordered flex items-center gap-2 mt-8 mb-3 ${
            errors.password && touched.password
              ? " border border-red-600 shake"
              : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
            className="grow p-0"
            placeholder="Password"
          />
        </label>

        {errors.password && touched.password && (
          <p className="text-red-600">{errors.password}</p>
        )}

        <p className="flex justify-end text-white">Forgot Password?</p>

        <button
          type="submit"
          disabled={
            errors.Name ||
            errors.email ||
            errors.password ||
            errors.confirmPassword ||
            isLoading
          }
          className="sub btn  w-64 my-11 mx-auto flex justify-center items-center text-xl text-[#1b2327e9] hover:bg-inherit hover:scale-95 hover:text-white"
        >
          LogIn
        </button>
        <p className="text-white text-center text-lg ">
          Don't have an acount ?{" "}
          <p
            className="underline inline font-medium cursor-pointer"
            onClick={toggleLoginFormVisibility}
          >
            Register
          </p>
        </p>
      </form>
      <div
        className={`image-container col-span-3 flex justify-center  items-center ${
          isLoginFormVisible ? "" : "move-left"
        }`}
      >
        <img src={svg} className="h-screen" />
      </div>
    </div>
  );
}
