import React from "react";
import { BiDotsHorizontal } from "react-icons/bi";

const HashTagCard = () => {
  return (
    <div className="card--container w-full flex justify-between items-center px-3 py-1 cursor-pointer hover:bg-gray-400 mb-4 ">
      <div className="flex flex-col">
        <span className="font-light text-sm">label</span>
        <span className="font-bold">#Tag title</span>
        <span className="font-light text-sm">2,000 Tweets</span>
      </div>
      {
        <BiDotsHorizontal
          size={20}
          onMouseEnter={(e) => (e.target.style.color = "#1e9bf0")}
          onMouseLeave={(e) => (e.target.style.color = "black")}
          className="px-1 hover:bg-sky-100 hover:rounded-xl"
        />
      }
    </div>
  );
};

export default HashTagCard;
