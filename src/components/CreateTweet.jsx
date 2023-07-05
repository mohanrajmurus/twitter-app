import React, { useContext, useState } from "react";
import profile from "../assets/images/profile.png";
import { GiWorld } from "react-icons/gi";
import { BiImage, BiPoll } from "react-icons/bi";
import { AiOutlineFileGif, AiOutlineSchedule } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../store/Context";
import { useMutation, useQueryClient } from "react-query";
import { postNewTweet } from "../Util";
const CreateTweet = () => {
  const queryClient = useQueryClient();

  const [newTweet, setNewTweet] = useState("");
  const { mutate } = useMutation(postNewTweet, {
    onSuccess: (data) => {
      console.log(data);
      console.log("Success");
      queryClient.invalidateQueries("tweets");
    },
    onError: () => {
      console.log("Error");
    },
  });
  const tags = newTweet.slice(newTweet.indexOf("#"), newTweet.length);
  const navigate = useNavigate();

  const {
    state: { user },
  } = useContext(User);
  const postTweet = async () => {
    if (Object.keys(user).length) {
      const loginId = user.loginId;
      const tweet = {
        loginId: loginId,
        tweet: newTweet,
        tag: tags,
        authorId: user.id,
      };
      mutate(tweet);
      setNewTweet("");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="flex space-x-3 border-b-2 px-3 cursor-pointer">
      <div className="w-1/12">
        <img src={profile} alt="profile" className="w-10 h-10 " />
      </div>
      <div className="w-10/12 flex flex-col items-start space-y-4">
        <div>
          <textarea
            placeholder="What is happening?!"
            rows={1}
            cols={60}
            value={newTweet}
            onChange={(e) => setNewTweet(e.target.value)}
            className="outline-none resize-none"
          />
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <GiWorld fill="#1e9bf0" />
          <span className="text-sky-500 font-bold text-sm">
            Everyone can reply
          </span>
        </div>
        <div className="w-full flex justify-between border-t-2 py-4">
          <div className="flex items-center space-x-2">
            <BiImage
              size={25}
              fill="#1e9bf0"
              className="p-1 rounded-full cursor-pointer hover:bg-sky-100"
            />
            <AiOutlineFileGif
              size={25}
              fill="#1e9bf0"
              className="p-1 rounded-full cursor-pointer hover:bg-sky-100"
            />
            <BiPoll
              size={25}
              fill="#1e9bf0"
              className="p-1 rounded-full cursor-pointer hover:bg-sky-100"
            />
            <AiOutlineSchedule
              size={25}
              fill="#1e9bf0"
              className="p-1 rounded-full cursor-pointer hover:bg-sky-100"
            />
            <BsEmojiSmile
              size={25}
              fill="#1e9bf0"
              className="p-1 rounded-full cursor-pointer hover:bg-sky-100"
            />
            <MdLocationPin
              size={25}
              fill="#1e9bf0"
              className="p-1 rounded-full cursor-pointer hover:bg-sky-100"
            />
          </div>
          <span
            className={`text-white px-5 py-2 rounded-3xl  bg-sky-400 cursor-pointer ${
              newTweet.length > 0 ? "opacity-100" : "opacity-50"
            }`}
            onClick={postTweet}
          >
            Tweet
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreateTweet;
