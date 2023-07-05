import React, { useContext, useState } from "react";
import { BsTwitter, BsBookmarkFill } from "react-icons/bs";
import {
  BiSolidHomeCircle,
  BiSearch,
  BiMessageSquareDetail,
  BiDotsHorizontal,
} from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { RiFileListLine, RiAccountBoxFill } from "react-icons/ri";
import { CgMoreO } from "react-icons/cg";
import profile from "../assets/images/profile.png";
import { NavLink, useNavigate } from "react-router-dom";
import { User } from "../store/Context";
const SideNavBar = () => {
  const [logoutBtn, setLogoutBtn] = useState(false);
  const navigate = useNavigate();

  const {
    state: { user },
    dispatch,
  } = useContext(User);
  return (
    <div className="container w-1/6 lg:w-2/5 h-screen flex flex-col space-y-4 px-3">
      <nav className="side--nav flex flex-col space-y-7 ">
        <div className="logo flex space-x-3 items-center">
          <BsTwitter size={30} fill="#1e9bf0" />
          <span></span>
        </div>
        <NavLink to="/">
          <div className="flex justify-start py-2 px-2 w-fit rounded-3xl pr-5 space-x-4 items-center hover:bg-zinc-200 cursor-pointer">
            <span>
              <BiSolidHomeCircle size={25} />
            </span>
            <span className="hidden lg:block text-xl">Home</span>
          </div>
        </NavLink>
        <div className="flex justify-start py-2 px-2 w-fit rounded-3xl pr-5 space-x-4 items-center hover:bg-zinc-200 cursor-pointer">
          <span>
            <BiSearch size={25} />
          </span>
          <span className="hidden lg:block text-xl">Explore</span>
        </div>
        <div className="flex justify-start py-2 px-2 w-fit rounded-3xl pr-5 space-x-4 items-center hover:bg-zinc-200 cursor-pointer">
          <span>
            <IoMdNotifications size={25} />
          </span>
          <span className="hidden lg:block text-xl">Notifications</span>
        </div>
        <div className="flex justify-start py-2 px-2 w-fit rounded-3xl pr-5 space-x-4 items-center hover:bg-zinc-200 cursor-pointer">
          <span>
            <BiMessageSquareDetail size={20} />
          </span>
          <span className="hidden lg:block text-xl">Messages</span>
        </div>
        <div className="flex justify-start py-2 px-2 w-fit rounded-3xl pr-5 space-x-4 items-center hover:bg-zinc-200 cursor-pointer">
          <span>
            <RiFileListLine size={20} />
          </span>
          <span className="hidden lg:block text-xl">List</span>
        </div>
        <div className="flex justify-start py-2 px-2 w-fit rounded-3xl pr-5 space-x-4 items-center hover:bg-zinc-200 cursor-pointer">
          <span>
            <BsBookmarkFill size={20} />
          </span>
          <span className="hidden lg:block text-xl">Bookmarks</span>
        </div>
        <div className="flex justify-start py-2 px-2 w-fit rounded-3xl pr-5 space-x-4 items-center hover:bg-zinc-200 cursor-pointer">
          <span>
            <RiAccountBoxFill size={20} />
          </span>
          <span
            className="hidden lg:block text-xl"
            onClick={() =>
              user.loginId ? navigate(`/${user.loginId}`) : navigate("/login")
            }
          >
            Profile
          </span>
        </div>
        <div className="flex justify-start py-2 px-2 w-fit rounded-3xl pr-5 space-x-4 items-center hover:bg-zinc-200 cursor-pointer">
          <span>
            <CgMoreO size={25} />
          </span>
          <span className="hidden lg:block text-xl">More</span>
        </div>
      </nav>

      {Object.keys(user).length ? (
        <div className="profile--card w-full flex justify-between items-center space-x-2 cursor-pointer  rounded-2xl px-2 py-2 hover:bg-zinc-200 relative"  onClick={() => setLogoutBtn(!logoutBtn)}>
          <div className="flex space-x-4 items-center">
            <img src={profile} alt="profile" className="w-10 h-10" />
            <div className="hidden lg:flex flex-col justify-self-start">
              <span>{user?.firstName}</span>
              <span className="text-gray-500">@{user?.loginId}</span>
            </div>
          </div>
          <BiDotsHorizontal
            size={25}
            className="hidden lg:block justify-self-end"
           
          />
          {logoutBtn && (
            <div className="w-full flex flex-col space-y-3 p-3 rounded-3xl bg-white shadow-2xl absolute -top-24 right-1 z-20">
              <span className="font-bold">Add an existing account</span>
              <span
              className="font-bold"
                onClick={() => {
                  dispatch({ type: "LOG__OUT", payload: {} });
                  setLogoutBtn(false);
                  navigate("/");
                }}
              >
                Logout@{user?.loginId}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div
          className="w-fit px-1 bg-sky-500 rounded-xl lg:rounded-3xl flex py-2 hover:bg-sky-600 lg:w-full justify-center"
          onClick={() => navigate("/login")}
        >
          <NavLink
            to="/login"
            className="text-sm md:text-lg text-white font-bold cursor-pointer"
          >
            Login
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default SideNavBar;
