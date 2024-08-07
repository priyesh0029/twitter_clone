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
        if (error.response) {
            // Handle errors with response
            console.log("Error response: ", error.response);
            throw new Error(error.response.data.message || 'Signup failed');
        } else {
            // Handle errors without response
            console.log("Error message: ", error.message);
            throw new Error('Signup failed due to an unknown error');
        }
        // console.log("error after response - service : ",error);
    //   throw new Error(error.response?.data?.message || 'Signup failed');
    }
  };
  
  // Add more authentication-related API calls here if needed
  