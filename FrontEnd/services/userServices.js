export const srvGetWhoToFollow = async (api) => {
    try {
      const response = await api.get('/user/whotofollow')
      console.log("response from the user service : ",response);
      
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };


  export const srvHandleFollow = async (api,userId) => {
    try {
        console.log("userId : ",userId);
        
      const response = await api.patch('/user/hanldefollow',{userId})
      console.log("response from the user service : ",response);
      
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  export const srvHandleProfile = async (api,userId) => {
    try {
        console.log("userId : ",userId);
        
      const response = await api.get(`/user/hanldeprofile/${userId}`)
      console.log("response from the user service : ",response);
      
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };