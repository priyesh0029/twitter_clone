import { tweetStore } from "~/stores/tweetStore";
import {srvCreatePost,srvGetPost} from "~/services/api/postServices"


export const usePost = () => {
  const postStore = tweetStore();
  const { $toast } = useNuxtApp();


  const createTweet = async (formData) => {
    const data = new FormData();
    data.append('text', formData.text);
    formData.mediaFiles.forEach((file) => {
      data.append('image', file);
    });

    data.forEach((key, value) => {
      console.log("post in front end formdata key and value: ", key, value);
    });

    try {
     
      const response = await srvCreatePost(data)
      console.log("response after fetching data creating post: ", response);
      postStore.setPosts([response.data, ...postStore.posts]);
      $toast.success('successfully posted your tweet !');
      return response;
    } catch (error) {
      $toast.error(error?.message || 'failed to post your tweet !');
    }
  };

  const getTweets = async () => {
    try {
      const response = await srvGetPost();
      console.log("response after fetching data: ", response);
      return response;
    } catch (error) {
      $toast.error(error?.message ||  'failed to fetch tweets !');
    }
  };

  return {
    createTweet,
    getTweets
  };
};
