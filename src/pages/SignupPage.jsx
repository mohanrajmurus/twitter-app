import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import {NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
const SignupPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    loginId: "",
    password: "",
    contactNumber: "",
    avatarId: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const fNameCheck = /^[A-Za-z]{3,15}$/;
    const lNameCheck = /^[A-Za-z]{1,}$/;
    const userNameCheck = /^[A-Za-z0-9]{3,15}$/;
    const emailCheck = /^[a-z]{2,}@[a-z]{3,}[.]{1}[a-z]{2,}$/;
    const passwordCheck =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,10}$/;
    const mobileNumCheck = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (!fNameCheck.test(user.firstName)) {
      setError("Enter Valid FirstName");
      return;
    } else if (!lNameCheck.test(user.lastName)) {
      setError("Enter Valid LastName");
    } else if (!userNameCheck.test(user.loginId)) {
      setError("Enter Valid Username");
    } else if (!emailCheck.test(user.email)) {
      setError("Enter Valid email");
    } else if (!mobileNumCheck.test(user.contactNumber)) {
      setError("Enter Valid Mobile Number");
    } else if (!passwordCheck.test(user.password)) {
      setError("Enter Valid password");
    } else {
      setError("");
      const { data } = await axios.post(
        "http://localhost:5000/api/v1.0/tweets/register",
        user
      );
      navigate("/login");
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="login--container w-full fixed md:w-1/2 bg-white  top-1/4 md:left-1/4 z-10 py-10 rounded-2xl">
        <div className=" w-full flex flex-col items-center space-y-4">
          <BsTwitter size={25} fill="#1e9bf0" />
          <h1 className="text-2xl font-bold">Join Twitter today</h1>
          <div className="google--signin  w-1/3 md:w-3/5 flex justify-center items-center border-2 border-gray-400 rounded-3xl py-1 space-x-3">
            <FcGoogle size={20} />
            <button className="">Signup with Google</button>
          </div>
          <div className="apple--signin  w-1/3 md:w-3/5 flex justify-center items-center border-2 border-gray-400 rounded-3xl py-1 space-x-3">
            <FaApple size={20} />
            <button>Signup with Apple</button>
          </div>
          <span className="w-1/3 text-center">or</span>
          {error && <span className="text-red-500">{error}</span>}
          <form
            onSubmit={registerUser}
            className="flex flex-col w-full items-center space-y-4"
          >
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={user.firstName}
              onChange={handleChange}
              className=" w-1/3 md:w-3/5 px-2 py-1 outline-none border-2 focus:border-sky-500 rounded-lg"
            />
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              placeholder="Last Name"
              onChange={handleChange}
              className=" w-1/3 md:w-3/5 px-2 py-1 outline-none border-2 focus:border-sky-500 rounded-lg"
            />
            <input
              type="text"
              name="loginId"
              value={user.loginId}
              placeholder="Username"
              onChange={handleChange}
              className=" w-1/3 md:w-3/5 px-2 py-1 outline-none border-2 focus:border-sky-500 rounded-lg"
            />
            <input
              type="email"
              name="email"
              value={user.email}
              placeholder="Email"
              onChange={handleChange}
              className=" w-1/3 md:w-3/5 px-2 py-1 outline-none border-2 focus:border-sky-500 rounded-lg"
            />
            <input
              type="text"
              name="contactNumber"
              value={user.contactNumber}
              placeholder="Mobile Number"
              onChange={handleChange}
              className=" w-1/3 md:w-3/5 px-2 py-1 outline-none border-2 focus:border-sky-500 rounded-lg"
            />
            <input
              type="password"
              placeholder="password"
              value={user.password}
              name="password"
              onChange={handleChange}
              className=" w-1/3 md:w-3/5 px-2 py-1 outline-none border-2 focus:border-sky-500 rounded-lg"
            />
            <button
              className=" w-1/3 md:w-3/5 px-3 py-2 bg-sky-500 text-white rounded-lg"
              type="submit"
            >
              Create Account
            </button>
          </form>
          <AiOutlineClose
            size={25}
            className="absolute -top-2 left-2 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="flex space-x-3">
            <span className="font-extralight">Already Have an Account?</span>
            <NavLink to="/login" className={"text-sky-500"}>
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
