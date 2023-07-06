import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTweetByTag } from "../Util";
import TweetCard from "../components/TweetCard";
import { MdOutlineArrowBack } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
const ExplorePage = () => {
  const { id } = useParams();
  const { isLoading, isError, error, data } = getTweetByTag(
    id.replace("#", "%23")
  );
  const navigate = useNavigate();
  return (
    <div className="main--container w-full h-screen overflow-y-scroll scroll-smooth border-l-2">
      <div className=" w-full flex  space-x-10">
        <div className="flex items-center justify-between space-x-3 px-3">
          <MdOutlineArrowBack
            onClick={() => navigate("/")}
            size={40}
            className="rounded-full cursor-pointer p-2 hover:bg-gray-200"
          />
          <></>
        </div>
        <div className="w-2/3 flex items-center rounded-3xl bg-gray-300 border-sky-500 hover:border-2 hover:text-gray-500 hover:bg-white px-3">
          <CiSearch />
          <input
            type="text"
            className="outline-none text-black text-md p-1 bg-inherit"
            placeholder="Search Twitter"
          />
        </div>
      </div>
      <div className="flex justify-between mt-10 border-b-2">
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
      <div className="flex flex-col items-center">
      {isLoading ? (
        <div className="border-4 border-gray-300 border-t-sky-400 rounded-full h-10 w-10 animate-spin text-center mt-10"></div>
      ) : isError ? (
        <span>{error.message}</span>
      ) : (
        data.map((item, i) => {
          return <TweetCard tweet={item} key={i} />;
        })
      )}
      </div>
    </div>
  );
};

export default ExplorePage;
