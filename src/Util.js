import axios from "axios";
import { useQuery } from "react-query";
const url = __API_URL__;

export const getTweets = () => {
  return useQuery({
    queryKey: ["tweets"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}tweets/all`);
      return data;
    },
  });
};

export const getTweet = (loginId) => {
  return useQuery({
    queryKey: ["tweets", loginId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}tweets/${loginId}`);
      return data;
    },
  });
};

export const postNewTweet = async (tweetData) => {
  const { loginId, tweet, tag, authorId } = tweetData;

  const { data } = await axios.post(`${url}tweets/${loginId}/add`, {
    tweet: tweet,
    tag: tag,
    authorId: authorId,
  });
  return data;
};

export const getTweetById = (id) => {
  return useQuery({
    queryKey: ["tweet", id],
    queryFn: async () => {
      const { data } = await axios.get(`${url}tweets/tweet/${id}`);
      return data;
    },
  });
};

export const getHashTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/tweets/tags`);
      return data;
    },
  });
};

export const getTweetByTag = (tag) => {
  return useQuery({
    queryKey:['tweets',tag],
    queryFn: async () => {
      const {data} = await axios.get(`${url}tweets/tag/${tag}/tweets`)
      return data
    }
  })
}

export const timeCal = (createdAt) => {
  const tweetTime = new Date(createdAt);
  const currTime = new Date();
  if (currTime.toLocaleDateString() === tweetTime.toLocaleDateString()) {
    const diff = currTime.getHours() - tweetTime.getHours();
    const min = tweetTime.getMinutes() - currTime.getMinutes();
    return `${diff == 0 ? `${Math.abs(min)} minutes` : `${diff}h`}`;
  } else if (currTime.getFullYear() === tweetTime.getFullYear()) {
    return `${tweetTime.toDateString().slice(4, 10)}`;
  } else {
    return `${tweetTime.toDateString().slice(4)}`;
  }
};

export const filterTags = (str) => {
  let tags = [];
  str.split(" ").map((item) => (item.includes("#") ? tags.push(item) : null));
  return tags;
};
