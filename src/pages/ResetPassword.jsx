import axios from "axios";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [newPass, setNewPass] = useState("");
  const [errMess, setErrMess] = useState("");
  const [passField, setPassField] = useState(false);
  const findUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1.0/tweets/users/all"
      );
      const user = data.filter((user) => user.loginId === userName);
      if (user.length) {
        setErrMess("");
        setPassField(true);
        const { data } = await axios.put(
          `http://localhost:5000/api/v1.0/tweets/user/${userName}/resetPassword/${newPass}`
        );
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setErrMess("Username not found. Please");
        
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="login--container w-full fixed md:w-1/2 bg-white  top-1/4 md:left-1/4 z-10 py-10 rounded-2xl">
        <div className=" w-full flex flex-col items-center space-y-4">
          <BsTwitter size={25} fill="#1e9bf0" />
          <h1 className="text-xl font-bold">Find your Twitter account</h1>
          <span className="text-sm text-gray-500 text-justify px-5">
            Enter the username associated with your account to change your
            password.
          </span>
          {errMess && <span className="text-red-400">{errMess} <NavLink to='/register' className={'text-sky-400 hover:underline'}>Create Account</NavLink></span>}
          <form
            className="w-full flex flex-col items-center space-y-4"
            onSubmit={findUser}
          >
            
            <input
              type="text"
              placeholder="Enter Username"
              name="userName"
              className="w-1/3 md:w-3/5 px-2 py-1 outline-none border-2 focus:border-sky-500 rounded-lg"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              disabled={passField?true:false}
            />
            {passField && (
              <input
                type="password"
                placeholder="Enter New Password"
                name="password"
                className="w-1/3 md:w-3/5 px-2 py-1 outline-none border-2 focus:border-sky-500 rounded-lg"
                onChange={(e) => setNewPass(e.target.value)}
                value={newPass}
              />
            )}
            <button
              className="w-1/3 md:w-3/5 px-3 py-2 bg-sky-500 text-white rounded-lg"
              type="submit"
            >
              {passField ? "Reset Password" : "Find"}
            </button>
          </form>
          <AiOutlineClose
            size={25}
            className="absolute -top-2 left-2 cursor-pointer"
            onClick={() => navigate("/login")}
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
