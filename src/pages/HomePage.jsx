import React from "react";
import TweetCard from "../components/TweetCard";

import { getTweets } from "../Util";
import CreateTweet from "../components/CreateTweet";
const HomePage = () => {
  const { isLoading, isError, error, data } = getTweets();
  return (
    <div className="main--container w-full h-screen overflow-y-scroll scroll-smooth">
      <div className="px-3 mb-10">
        <h1 className="text-xl font-bold">Home</h1>
      </div>
      <CreateTweet />
      <div className="w-full flex flex-col items-center">
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

export default HomePage;
