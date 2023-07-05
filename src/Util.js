import axios from "axios";
import { useQuery } from "react-query";

export const getTweets = () => {
  return useQuery({
    queryKey: ["tweets"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1.0/tweets/all"
      );
      return data;
    },
  });
};

export const getTweet = (loginId) => {
  return useQuery({
    queryKey: ["tweets", loginId],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1.0/tweets/${loginId}`
      );
      return data;
    },
  });
};

export const postNewTweet = async (tweetData) => {
  const { loginId, tweet, tag, authorId } = tweetData;

  const { data } = await axios.post(
    `http://localhost:5000/api/v1.0/tweets/${loginId}/add`,
    {
      tweet: tweet,
      tag: tag,
      authorId: authorId,
    }
  );
  return data;
};

export const getTweetById = (id) => {
  return useQuery({
    queryKey: ["tweets", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1.0/tweets/tweet/${id}`
      );
      return data;
    },
  });
};

export const timeCal = (createdAt) => {
  const tweetTime = new Date(createdAt);
  const currTime = new Date();
  if (currTime.toLocaleDateString() === tweetTime.toLocaleDateString()) {
    const diff = currTime.getHours() - tweetTime.getHours();
    const min = tweetTime.getMinutes() - currTime.getMinutes();
    //console.log(min);
    return `${diff == 0 ? `${Math.abs(min)} minutes` : `${diff}h`}`;
  } else if (currTime.getFullYear() === tweetTime.getFullYear()) {
    return `${tweetTime.toDateString().slice(4, 10)}`;
  } else {
    return `${tweetTime.toDateString().slice(4)}`;
  }
};



