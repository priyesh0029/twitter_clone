// services/authService.js
import useApi from '~/utils/api';

export const authenticateUser = async (credentials) => {
    try {
      const response = await useApi().post('/auth/login', credentials);
      return response;
    } catch (error) {
      console.log("error from auth service : ",error);
      
      throw new Error(error || 'Login failed');
    }
  };
  
  export const registerUser = async (credentials) => {
    console.log("signup credentials : ",credentials);
    try {
      const response = await useApi().post('/auth/signup', credentials);
      console.log(response);
      return response.data;
    } catch (error) {
        throw new Error(error || 'Signup failed');
    }
  };
  
  