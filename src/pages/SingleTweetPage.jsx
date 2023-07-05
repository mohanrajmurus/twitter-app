import React from "react";

import { NavLink, useNavigate, useParams } from "react-router-dom";
import TweetCard from "../components/TweetCard";
import { getTweetById, timeCal } from "../Util";
import { MdOutlineArrowBack } from "react-icons/md";
import profile from "../assets/images/profile.png";

const SingleTweetPage = () => {
  const { id } = useParams();
  const { isLoading, isError, error, data } = getTweetById(id);
  const navigate = useNavigate();
  return (
    <div className="container w-full h-screen lg:w-4/5 mx-auto my-2 flex overflow-y-scroll">
     

      <div className="main--container w-full h-screen overflow-y-scroll scroll-smooth">
        <div className="w-full flex items-center space-x-8 px-3 ">
          <MdOutlineArrowBack
            onClick={() => navigate("/")}
            size={40}
            className="rounded-full cursor-pointer p-2 hover:bg-gray-200"
          />
          <span className="flex flex-col">
            <span className="font-bold">Tweet</span>
          </span>
        </div>
        {isLoading ? (
          <div className="w-full flex justify-center">
            <div className="border-4 border-gray-300 border-t-sky-400 rounded-full h-10 w-10 animate-spin text-center mt-10"></div>
          </div>
        ) : isError ? (
          <span>{error.message}</span>
        ) : (
          <div className="flex flex-col">
            <TweetCard tweet={data} />
            {data.replies?.map((item, i) => {
                   // console.log(item);
                  return (
                    <div className="flex space-x-5 px-3 py-4" key={i}>
                        <img src={profile} className="w-7 h-7" />
                      <div>
                      <div className="flex space-x-2">
                        <NavLink onClick={() => navigate(`/${item.author.loginId}`)}>
                          <span className="font-bold">{item.author?.firstName}</span>
                        </NavLink>
                        <span className="text-gray-400">
                          @{item.author?.loginId}
                        </span>
                        <span className="text-gray-400">
                          {timeCal(item.createdAt)}
                        </span>
                      </div>
                      <span className="text-sm">{item.text}</span>
                      </div>
                    </div>
                  );
                })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleTweetPage;
