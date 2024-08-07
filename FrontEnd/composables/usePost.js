import { srvCreatePost, srvGetPost } from "~/services/postServices";
import { usePostStore } from "~/stores/usePostStore";

export const usePost =  () => {
    const { $api } = useNuxtApp();
    const postStore = usePostStore();
  
    const createTweet = async (formData) => {
        const data = new FormData()
        data.append('text',formData.text)
        formData.mediaFiles.forEach((file)=>{
          data.append(`image`, file);
        })

        data.forEach((key, value) => {
          console.log(
            "post in front end formdata key and value  : ",
            key,
            value
          );
        });
      try {
          const response = await srvCreatePost($api, data);
          console.log("response after fetching data : ", response);
          postStore.setPosts([response,...postStore.posts]);
      } catch (error) {
       console.log(error);
      }
    };

    //to get all the tweets for home page
    const getTweets = async () => {
      
    try {
        const response = await srvGetPost($api);
        console.log("response after fetching data : ", response);
        postStore.setPosts(response);
    } catch (error) {
     console.log(error);
    }
  };

  
  
    return {
        createTweet,
        getTweets
    };
  };
  