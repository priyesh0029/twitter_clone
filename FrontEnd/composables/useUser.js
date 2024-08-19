// composables/useAuth.js
import { useUserStore } from "~/stores/user";
import { useNuxtApp } from "#app";


export const useUser = () => {
  const userStore = useUserStore();
  const { $customApi } = useNuxtApp();
  const { $toast } = useNuxtApp();



  const whoTofollow = async () => {
    try {
        const response = await $customApi.get('/user/whotofollow')
        console.log("response after fetching data whoTofollow : ", response);
        return response
    } catch (error) {
     console.log(error);
     $toast({
      text: error?.message || 'failed to load follow suggestions', 
      style: {
        background: "rgba(255, 0, 0, 0.7)", 
        borderRadius: "8px", 
        color: "white",
      }
    }).showToast();
    }
  };

  const handleFollowUnfollow = async (userId)=>{
    console.log("userId 11 : ",  userId);
    
    try {
        const response = await $customApi.post('/user/hanldefollow',{userId})
        console.log("response after fetching data handleFollowUnfollow: ", response);
        return response
    } catch (error) {
     console.log(error);
     $toast({
      text: error?.message || 'failed to handle follow or unfollow request', 
      style: {
        background: "rgba(255, 0, 0, 0.7)", 
        borderRadius: "8px", 
        color: "white",
      }
    }).showToast();
    }
  }

  const handleProfileDetails = async (userId)=>{
    console.log("userId 11 : ",  userId);
    
    try {
        const response = await $customApi.get(`/user/hanldeprofile/${userId}`)
        console.log("response after fetching data handleProfileDetails: ", response);
        return response
    } catch (error) {
     console.log(error);
     $toast({
      text: error?.message || 'failed to fetch profile data ', 
      style: {
        background: "rgba(255, 0, 0, 0.7)", 
        borderRadius: "8px", 
        color: "white",
      }
    }).showToast();
    }
  }

  //to change propic 
  const changePropic = async (formData) => {
  //   const data = new FormData()
  //   data.append('image',formData.mediaFile)
    

  //   data.forEach((key, value) => {
  //     console.log(
  //       "post in front end formdata key and value  : ",
  //       key,
  //       value
  //     );
  //   });
  // try {
  //     const response = await srvChangePropic( data);
  //     console.log("response after fetching data : ", response);
     
  // } catch (error) {
  //  console.log(error);
  // $toast({
  //   text: error?.message || 'Login failed', 
  //   style: {
  //     background: "rgba(255, 0, 0, 0.7)", 
  //     borderRadius: "8px", 
  //     color: "white",
  //   }
  // }).showToast();
  // }
};

  return {
    whoTofollow,
    handleFollowUnfollow,
    handleProfileDetails,
    changePropic
  };
};
