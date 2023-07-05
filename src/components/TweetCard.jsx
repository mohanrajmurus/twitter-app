import React, { useContext, useState } from "react";
import profile from "../assets/images/profile.png";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiBarChart, FiShare } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from "../store/Context";
import { useQueryClient } from "react-query";
import { timeCal } from "../Util";

const TweetCard = ({ tweet }) => {
  const queryClient = useQueryClient();
  const { author, text, liked, likeCount, replies, replyCount, createdAt } =
    tweet;
  const [isOpen, setIsOpen] = useState(false);
  const [reply, setReply] = useState("");
  const index = text?.indexOf("#");
  const navigate = useNavigate();

  const [likedStatus, setLikedStatus] = useState("");
  const {
    state: { user },
  } = useContext(User);

  const postComment = async (e) => {
    e.preventDefault();
    if (Object.keys(user).length) {
      const replyData = {
        reply: reply,
        tag: "",
        authorId: user.id,
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/v1.0/tweets/${user.loginId}/reply/${tweet.id}`,
        replyData
      );
      queryClient.invalidateQueries("tweets");
      setIsOpen(false);
    } else {
      navigate("/login");
    }
  };
  const postRetweet = () => {
    if (Object.keys(user).length) {
      return true;
    } else {
      navigate("/login");
    }
  };
  const postLike = async () => {
    if (Object.keys(user).length) {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1.0/tweets/${user.loginId}/like/${tweet.id}`
      );
      setLikedStatus(data.status);
      queryClient.invalidateQueries("tweets");
    } else {
      navigate("/login");
    }
  };
  const handleChnage = (e) => {
    setReply(e.target.value);
  };
  return (
    <div className="tweet--container w-full flex space-x-2 p-4 border-b-2 hover:bg-slate-100 cursor-pointer">
      <img src={profile} className="w-9 h-8" />
      <div className="w-full">
        <div onClick={() => navigate(`/tweet/${tweet.id}`)}>
          <div className="flex space-x-2">
            <NavLink
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/${author.loginId}`);
              }}
            >
              <span className="font-bold">{author?.firstName}</span>
            </NavLink>
            <span className="text-gray-400">@{author?.loginId}</span>
            {<span className="text-gray-400">{timeCal(createdAt)}</span>}
          </div>
          <div>
            <p className="text-justify">
              <span className="text-justify">{text?.slice(0, index)}</span>
              <span className="text-sky-500">
                {text.slice(index, text.length)}
              </span>
            </p>
          </div>
        </div>
        <div className="w-4/5 flex justify-between mt-3">
          <div
            className="flex items-center space-x-2 hover:text-sky-500 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaRegComment
              size={25}
              className="rounded-xl px-1 hover:bg-sky-100 "
            />
            <span className="text-sm">{replyCount}</span>
          </div>
          <div
            className="flex items-center space-x-2 hover:text-green-500 cursor-pointer"
            onClick={postRetweet}
          >
            <FaRetweet
              size={25}
              className="rounded-xl px-1 hover:bg-green-100 "
            />
            <span className="text-sm">100</span>
          </div>
          <div
            className="flex items-center space-x-2 hover:text-pink-500 cursor-pointer"
            onClick={postLike}
          >
            {likedStatus === "Tweet liked successfully" ? (
              <AiFillHeart
                size={25}
                fill="red"
                className="rounded-xl px-1 hover:bg-sky-100 "
              />
            ) : (
              <AiOutlineHeart
                size={25}
                className="rounded-xl px-1 hover:bg-sky-100 "
              />
            )}
            <span className="text-sm">{likeCount}</span>
          </div>
          <div className="flex items-center space-x-2 hover:text-sky-500 cursor-pointer">
            <FiBarChart
              size={25}
              className="rounded-xl px-1 hover:bg-sky-100 "
            />
            <span className="text-sm">10000</span>
          </div>
          <div className="flex items-center space-x-2 hover:text-sky-500 cursor-pointer">
            <FiShare size={25} className="rounded-xl px-1 hover:bg-sky-100 " />
            <span className="text-sm">8</span>
          </div>
        </div>
        {isOpen && (
          <div className="w-full mt-5">
            <form className="flex items-center space-x-3">
              <input
                type="text"
                value={reply}
                className="w-4/5 outline-none px-2 py-1 border-2 border-gray-300 focus:border-sky-400"
                onChange={handleChnage}
              />
              <button
                className="bg-sky-400 px-2 py-1 rounded-xl text-white font-sm"
                onClick={postComment}
              >
                Reply
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TweetCard;
