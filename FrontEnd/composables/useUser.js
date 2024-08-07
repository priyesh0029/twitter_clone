// composables/useAuth.js
// import { useAuthStore } from '@/store/auth';
import { useUserStore } from "~/stores/useUserStore";
import { useNuxtApp } from "#app";
import { srvLogin, srvSignup } from "~/services/authServices";
import { srvGetWhoToFollow, srvHandleFollow } from "~/services/userServices";

export const useUser = () => {
  const { $api } = useNuxtApp();
  //   const authStore = useAuthStore();
  const userStore = useUserStore();

//   const handleAuthError = (error) => {
//     console.error("Authentication error: ", error.message);
//   };

  const whoTofollow = async () => {
    try {
        const response = await srvGetWhoToFollow($api);
        console.log("response after fetching data : ", response.data);
        // postStore.setPosts(response);
        return response.data
    } catch (error) {
     console.log(error);
    }
  };

  const handleFollowUnfollow = async (userId)=>{
    console.log("userId 11 : ",  userId);
    
    try {
        const response = await srvHandleFollow($api,userId);
        console.log("response after fetching data : ", response.data);
        // postStore.setPosts(response);
        return response.data
    } catch (error) {
     console.log(error);
    }
  }


  return {
    whoTofollow,
    handleFollowUnfollow
  };
};
