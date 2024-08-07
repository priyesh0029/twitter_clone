// services/authService.js
export const srvCreatePost = async (api,data) => {
    try {
      const response = await api.post('/tweet/create', data,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };


  export const srvGetPost = async (api) => {
    try {
      const response = await api.get('/tweet/tweets')
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  

  // Add more authentication-related API calls here if needed
  