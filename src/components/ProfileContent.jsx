import React from "react";
import { MdOutlineArrowBack, MdLocationPin } from "react-icons/md";
import profile from "../assets/images/profile.png";
import { AiOutlineLink, AiTwotoneCalendar } from "react-icons/ai";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import tweet from "../assets/images/tweetbg.jpg";
import TweetCard from "./TweetCard";
import { getTweet } from "../Util";
const ProfileContent = ({ loginId }) => {
  const navigate = useNavigate();
  const { isLoading, isError, error, data } = getTweet(loginId);
  return (
    <div className="main--container w-full h-screen overflow-y-scroll scroll-smooth">
      <div className="flex flex-col  w-full">
        {isLoading ? (
          <div className="border-4 border-gray-300 border-t-sky-400 rounded-full h-10 w-10 animate-spin text-center mt-10 self-center"></div>
        ) : isError ? (
          <span>{error.message}</span>
        ) : (
          <div>
            <div className="border-b-2 border-gray-300">
              <div className="w-full flex items-center space-x-8 px-3 ">
                <MdOutlineArrowBack
                  onClick={() => navigate("/")}
                  size={40}
                  className="rounded-full cursor-pointer p-2 hover:bg-gray-200"
                />
                <span className="flex flex-col">
                  <span className="font-bold">{data.user.firstName}</span>
                  <span className="font-extralight">
                    {data.tweets.length} Tweets
                  </span>
                </span>
              </div>
              <div className="h-52 border-y-2">
                <img
                  src={tweet}
                  alt="tweet"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full flex flex-col space-y-3 relative px-3">
                <div className="w-full flex justify-between items-start px-3">
                  <img
                    src={profile}
                    alt="profile"
                    className="w-24 h-24 absolute -top-14 border-3 border-white"
                  />
                  <button className="edit--btn font-semibold absolute top-2 right-5 px-4 py-1 rounded-3xl text-sm hover:bg-gray-300">
                    Edit Profile
                  </button>
                </div>
                <div className="flex flex-col px-4">
                  <span className="font-bold mt-10">{data.user.firstName}</span>
                  <span className="font-extralight">@{data.user.loginId}</span>
                </div>
                <div className="flex flex-wrap space-x-3 px-3">
                  <div className="flex items-center space-x-2">
                    <span>
                      <MdLocationPin />
                    </span>
                    <span>Loaction</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>
                      <AiOutlineLink />
                    </span>
                    <span>WebLink</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>
                      <LiaBirthdayCakeSolid />
                    </span>
                    <span>Brith Day</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>
                      <AiTwotoneCalendar />
                    </span>
                    <span>Joined date</span>
                  </div>
                </div>
                <div className="flex space-x-3 px-3">
                  <div className="flex space-x-2 hover:border-b-2">
                    <span className="font-semibold">100</span>
                    <span className="font-extralight">Following</span>
                  </div>
                  <div className="flex space-x-2 hover:border-b-2">
                    <span className="font-semibold">45</span>
                    <span className="font-extralight">Followers</span>
                  </div>
                </div>
                <div className="flex justify-evenly">
                  <button className="px-6 py-3 hover:bg-gray-300">
                    Tweets
                  </button>
                  <button className="px-6 py-3 hover:bg-gray-300">
                    Replies
                  </button>
                  <button className="px-6 py-3 hover:bg-gray-300">
                    Highlights
                  </button>
                  <button className="px-6 py-3 hover:bg-gray-300">Media</button>
                  <button className="px-6 py-3 hover:bg-gray-300">Likes</button>
                </div>
              </div>
            </div>
            {data.tweets.map((item, i) => {
              return <TweetCard tweet={item} key={i} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileContent;
