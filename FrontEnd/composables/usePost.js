import { usePostStore } from "~/stores/post";
import { useNuxtApp } from "#app";


export const usePost = () => {
  const postStore = usePostStore();
  const { $customApi } = useNuxtApp();
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
     
      const response = await $customApi.post('/tweet/create', data);
      console.log("response after fetching data creating post: ", response);
      postStore.setPosts([response.data, ...postStore.posts]);
      return response;
    } catch (error) {
      $toast({
        text: error?.message || 'failed to post your tweet !', 
        style: {
          background: "rgba(255, 0, 0, 0.7)", 
          borderRadius: "8px", 
          color: "white",
        }
      }).showToast();
    }
  };

  const getTweets = async () => {
    try {
      const response = await $customApi.get('/tweet/tweets');
      console.log("response after fetching data: ", response);
      return response;
    } catch (error) {
      $toast({
        text: error?.message || 'failed to fetch tweets !', 
        style: {
          background: "rgba(255, 0, 0, 0.7)", 
          borderRadius: "8px", 
          color: "white",
        }
      }).showToast();
    }
  };

  return {
    createTweet,
    getTweets
  };
};
