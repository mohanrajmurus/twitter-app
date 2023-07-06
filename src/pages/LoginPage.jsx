import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { User } from "../store/Context";
import axios from "axios";
const url = __API_URL__
const LoginPage = () => {
  const [logindata, setLogindata] = useState({
    loginId: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { dispatch } = useContext(User);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLogindata({
      ...logindata,
      [e.target.name]: e.target.value,
    });
  };
  const postLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${url}tweets/login`,
        logindata
      );
      console.log(data);
      if (Object.keys(data).length > 1) {
        dispatch({
          type: "SET__USER",
          payload: data.user,
        });
        navigate("/");
        setLogindata({
          loginId: "",
          password: "",
        });
        setErrorMessage(undefined);
      } else {
        setErrorMessage("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm">
     
      <div className="login--container w-full fixed lg:w-1/2 bg-white  top-1/4 lg:left-1/4 z-10 py-10 rounded-2xl">
        <div className=" w-full flex flex-col items-center space-y-4">
          <BsTwitter size={25} fill="#1e9bf0" />
          {errorMessage && <span className="text-red-500">{errorMessage}</span>}
          <h1 className="text-2xl font-bold">Sign in to Twitter</h1>
          <div className="google--signin w-3/5 sm:w-1/3 flex justify-center items-center border-2 border-gray-400 rounded-3xl py-1 space-x-3">
            <FcGoogle size={20} />
            <button className="">Signin with Google</button>
          </div>
          <div className="apple--signin w-3/5 sm:w-1/3 flex justify-center items-center border-2 border-gray-400 rounded-3xl py-1 space-x-3">
            <FaApple size={20} />
            <button>Signin with Apple</button>
          </div>
          <span className="w-1/3 text-center">or</span>
          <form
            className="w-full flex flex-col items-center space-y-3"
            onSubmit={postLogin}
          >
            <input
              type="text"
              name="loginId"
              value={logindata.userName}
              placeholder="Phone,email or username"
              onChange={handleChange}
              className="w-3/5 sm:w-1/3 px-2 py-1 outline-none border-2 focus:border-sky-500 rounded-lg"
            />
            <input
              type="password"
              placeholder="password"
              value={logindata.password}
              name="password"
              onChange={handleChange}
              className="w-3/5 sm:w-1/3 px-2 py-1 outline-none border-2 focus:border-sky-500 rounded-lg"
            />
            <button
              className="w-3/5 sm:w-1/3 px-3 py-2 bg-sky-500 text-white rounded-lg"
              type="submit"
            >
              Login
            </button>
          </form>
          <AiOutlineClose
            size={25}
            className="absolute -top-2 left-2 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <span
            onClick={() => navigate("/resetpassword")}
            className="cursor-pointer"
          >
            Reset Password
          </span>
          <div className="flex space-x-3">
            <span className="font-extralight">Don't Have an Account?</span>
            <NavLink to="/register" className={"text-sky-500"}>
              SignUp
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
