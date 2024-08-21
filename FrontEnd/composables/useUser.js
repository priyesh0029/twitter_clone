// composables/useAuth.js
import { userStore } from "~/stores/userStore";
import {srvGetWhoToFollow,srvHandleFollow,srvHandleProfile,} from "~/services/api/userServices"


export const useUser = () => {
  const { $customApi } = useNuxtApp();
  const { $toast } = useNuxtApp();



  const whoTofollow = async () => {
    try {
        const response = await srvGetWhoToFollow()
        console.log("response after fetching data whoTofollow : ", response);
        return response
    } catch (error) {
     console.log(error);
    $toast.error(error?.message ||  'failed to load follow suggestions');

    }
  };

  const handleFollowUnfollow = async (userId)=>{
    console.log("userId 11 : ",  userId);
    
    try {
        const response = await srvHandleFollow({userId})
        console.log("response after fetching data handleFollowUnfollow: ", response);
        return response
    } catch (error) {
     console.log(error);
    $toast.error(error?.message ||  'failed to handle follow or unfollow request');
    }
  }

  const handleProfileDetails = async (userId)=>{
    console.log("userId 11 : ",  userId);
    
    try {
        const response = await srvHandleProfile(userId)
        console.log("response after fetching data handleProfileDetails: ", response);
        return response
    } catch (error) {
     console.log(error);
    $toast.error(error?.message ||   'failed to fetch profile data ');

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
  $toast.error(error?.message ||   'failed to change profile picture ');

  // }
};

  return {
    whoTofollow,
    handleFollowUnfollow,
    handleProfileDetails,
    changePropic
  };
};
