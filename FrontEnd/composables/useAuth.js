// composables/useAuth.js
import { useCookie } from '#app';
import { userStore } from '~/stores/userStore';
import {authenticateUser, registerUser} from '~/services/api/authServices'

export const useAuth = () => {
  const { $toast } = useNuxtApp();
  const user = userStore();


  const login = async (credentials) => {
    try {
        const response = await authenticateUser(credentials)
        console.log("response after fetching data : ", response);
         return response.data
    } catch (error) {
      console.log("error for the auth fetch : ",error.message);
        $toast.error(error?.message || 'Login failed');

      
    }
  };

  const signup = async (credentials) => {
    console.log("signup credentials : ", credentials);
    try {
      const data = await registerUser(credentials)
      console.log("response after fetching data : ", data);
      user.setUserInfo(data.user);
        console.log("token form the backend :  ",data.token);
          const token = useCookie('token')
          token.value = data.token
          
        return navigateTo("/")
    } catch (error) {
      $toast.error(error?.message || 'Signup failed');
      console.log(error);

    }
  };

  return {
    login,
    signup,
  };
};
