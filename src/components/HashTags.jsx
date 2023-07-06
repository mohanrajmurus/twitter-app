import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import HashTagCard from "./HashTagCard";
import { getHashTags } from "../Util";

const HashTags = () => {
  const { isLoading, isError, error, data } = getHashTags();
  const [isexpand, setIsexpand] = useState(false)
  const [itemsCount, setItemsCount] = useState(4)
  
  return (
    <div className="container hidden lg:flex flex-col items-start space-y-4 w-3/5 h-screen px-5 overflow-y-scroll scroll-smooth">
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
        {isLoading ? (
          <div className="border-4 border-gray-300 border-t-sky-400 rounded-full h-10 w-10 animate-spin text-center mt-10"></div>
        ) : isError ? (
          <span>{error.message}</span>
        ) : (
          data.slice(0,itemsCount).map((item, i) => {
            
            return <HashTagCard tags={item} key={i} />;
          })
        )}
        </div>
        <div className="mb-1 hover:bg-gray-400 w-full rounded-b-2xl px-3">
         {isexpand ?  <button className=" text-sky-500 py-2 hover:text-sky-700" onClick={()=>{
          setItemsCount(4)
          setIsexpand(false)
          }}>
            Show less
          </button>: <button className=" text-sky-500 py-2 hover:text-sky-700" onClick={()=>{
            setItemsCount(data.length)
            setIsexpand(true)
            }}>
            Show more
          </button>}
        </div>
      </div>
    </div>
  );
};

export default HashTags;
