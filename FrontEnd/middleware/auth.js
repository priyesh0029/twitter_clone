// import { useUserStore } from '~/stores/useUserStore';
// import { useLocalStorage } from '@vueuse/core';

// export default defineNuxtRouteMiddleware((to, from) => {

//   const userStore = useUserStore();
//   // const token = useLocalStorage('token', '')

//     // Check if the token exists in local storage
//     // const token = localStorage.getItem('token');
//     // await userStore.$hydrate();
//     console.log("log token form the middleware : ",token);
//     if (!userStore.token || userStore.token === '' && to.path !== '/login') {
//       // Redirect to login page if token is not present and the user is trying to access a protected route
//       return navigateTo('/login');
//     }
//   });
  

// middleware/auth.js
// export default defineNuxtRouteMiddleware((to, from) => {
//   if (process.import.meta.client) {
//     const token = localStorage.getItem('token');
//     console.log("token from middleware : ",token);
//     if (!token || token === '') {
//       return navigateTo('/login');
//     }
//   }
// });


// middleware/auth.js
import { defineNuxtRouteMiddleware, navigateTo } from '#app';
import { useUserStore } from '~/stores/useUserStore';

export default defineNuxtRouteMiddleware(  (to, from) => {
  if (import.meta.client) {
    const userStore = useUserStore();

    if (!userStore.isInitialized) {
     
        userStore.initialize();
       
    }

    const token = userStore.token || localStorage.getItem('token');
    console.log("token from middleware: ", token);

    if (!token || token === '' && to.path !== '/login') {
      return navigateTo('/login');
    }
  }
});


