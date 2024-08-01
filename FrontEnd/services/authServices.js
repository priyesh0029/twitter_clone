// services/authService.js
export const srvLogin = async (api,credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };
  
  export const srvSignup = async (api,credentials) => {
    console.log("signup credentials : ",api,credentials);
    try {
      const response = await api.post('/auth/signup', credentials);
      console.log(response);
      return response.data;
    } catch (error) {
        console.log("error after response - service : ",error);
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  };
  
  // Add more authentication-related API calls here if needed
  