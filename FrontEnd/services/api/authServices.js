// services/authService.js
import useApi from '~/utils/api';
const api = useApi();

export const srvLogin = async (credentials) => {
    try {
        console.log("custom api on auth service : ",api)
      const response = await api.post('/auth/login', credentials);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };
  
  export const srvSignup = async (credentials) => {
    console.log("signup credentials : ",credentials);
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
  