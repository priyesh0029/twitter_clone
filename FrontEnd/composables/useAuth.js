// composables/useAuth.js
import { useUserStore } from "~/stores/user";
import { useCookie } from '#app';


export const useAuth = () => {
  const { $customApi } = useNuxtApp();
  const { $toast } = useNuxtApp();
  const userStore = useUserStore();


  const login = async (credentials) => {
    try {
        console.log("custom api : ",$customApi)
        const response = await $customApi.post('/auth/login', credentials);

        console.log("response after fetching data : ", response);
         return response.data
    } catch (error) {
      console.log("error for the auth fetch : ",error.message);
        $toast({
          text: error?.message || 'Login failed', 
          style: {
            background: "rgba(255, 0, 0, 0.7)", 
            borderRadius: "8px", 
            color: "white",
          }
        }).showToast();
      
    }
  };

  const signup = async (credentials) => {
    console.log("signup credentials : ", credentials);
    try {
      const {data} = await $customApi.post('/auth/signup', credentials);

      console.log("response after fetching data : ", data);
        userStore.setUserInfo(data.user);
        console.log("token form the backend :  ",data.token);
          const token = useCookie('token')
          token.value = data.token
          
        return navigateTo("/")
    } catch (error) {
      $toast({
        text: error?.message || 'Signup failed', 
        style: {
          background: "rgba(255, 0, 0, 0.7)", 
          borderRadius: "8px", 
          color: "white",
        }
      }).showToast();
      console.log(error);

    }
  };

  return {
    login,
    signup,
  };
};
