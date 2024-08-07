// composables/useAuth.js
// import { useAuthStore } from '@/store/auth';
import { useUserStore } from "~/stores/useUserStore";
import { useNuxtApp } from "#app";
import { srvLogin, srvSignup } from "~/services/authServices";

export const useAuth = () => {
  const { $api } = useNuxtApp();
  //   const authStore = useAuthStore();
  const userStore = useUserStore();

  const handleAuthError = (error) => {
    console.error("Authentication error: ", error.message);
  };

  const login = async (credentials) => {
    try {
        const {data} = await srvLogin($api, credentials);
        console.log("response after fetching data : ", data);
          // localStorage.setItem('token', data.token);
          // localStorage.setItem('userInfo', JSON.stringify(data.user) );
          userStore.setUserInfo(data.user);
          userStore.setToken(data.token);
          navigateTo("/")
    } catch (error) {
      handleAuthError(error);
      // Error handling is already done in the interceptor
    }
  };

  const signup = async (credentials) => {
    console.log("signup credentials : ", credentials);
    try {
      const {data} = await srvSignup($api, credentials);
      console.log("response after fetching data : ", data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userInfo', data.user);
        userStore.setUserInfo(data.user);
        userStore.setToken(data.token);
        navigateTo("/")
    } catch (error) {
      // Error handling is already done in the interceptor
      handleAuthError(error);
      console.log("signup error : ", error);
    }
  };

  return {
    login,
    signup,
  };
};
