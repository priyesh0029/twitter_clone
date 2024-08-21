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
        throw new Error(error.response.data.message || 'Signup failed');
    }
  };
  
  