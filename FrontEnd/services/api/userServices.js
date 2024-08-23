import useApi from '~/utils/api';

export const fetchFollowSuggestions = async () => {
    try {
      const response = await useApi().get('/user/who-to-follow')
      console.log("response from the user service : ",response);
      
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'failed to load follow suggestions');
    }
  };


  export const manageFollowAction = async (userId) => {
    try {
        console.log("userId : ",userId);
        
      const response = await useApi().post('/user/hanlde-follow',userId)
      console.log("response from the user service : ",response);
      
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'failed to handle follow or unfollow request');
    }
  };

  export const fetchUserProfile = async (userId) => {
    try {
        console.log("userId : ",userId);
        
      const response = await useApi().get(`/user/hanlde-profile/${userId}`)
      console.log("response from the user service : ",response);
      
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message ||  'failed to fetch profile data');
    }
  };

//   export const updateProfilePicture = async (data) => {
//     try {
//       const response = await api.post('/user/change-display-image', data,{
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Login failed');
//     }
//   };