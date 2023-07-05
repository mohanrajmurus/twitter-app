import React from "react";
import { CiSearch } from "react-icons/ci";
import HashTagCard from "./HashTagCard";
const HashTags = () => {
  return (
    <div className="container hidden lg:flex flex-col items-start space-y-4 w-3/5 h-screen px-5">
      <div className="w-full flex items-center rounded-3xl bg-gray-300 border-sky-500 hover:border-2 hover:text-gray-500 hover:bg-white px-3">
        <CiSearch />
        <input
          type="text"
          className="outline-none text-black text-md p-1 bg-inherit"
          placeholder="Search Twitter"
        />
      </div>
      <div className="w-full flex flex-col items-start space-y-2 bg-gray-300 rounded-xl pt-2">
        <h2 className="text-lg font-bold px-3">What’s happening</h2>
        <div className="w-full">
          <HashTagCard />
          <HashTagCard />
          <HashTagCard />
          <HashTagCard />
        </div>
        <div className="mb-1 hover:bg-gray-400 w-full rounded-b-2xl px-3">
          <button className=" text-sky-500 py-2 hover:text-sky-700">
            Show more
          </button>
        </div>
      </div>
    </div>
  );
};

export default HashTags;
