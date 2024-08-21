// import { defineStore } from 'pinia';
// import { ref, computed } from 'vue';
// import { useCookie } from '#app'; // Using Nuxt 3's built-in useCookie

// export const userStore = defineStore('user', () => {
//   // State
//   const userInfo = ref({});
//   const isInitialized = ref(false);

//   // Cookie for userInfo
//   const userInfoCookie = useCookie('userInfo');

//   // Actions
//   function initialize() {
//     if (typeof window !== 'undefined') {
//       const cookieData = userInfoCookie.value;
//       try {
//         const decodedData = cookieData ? toRaw(cookieData) : {};
        
//         userInfo.value = decodedData;
//         console.log("decodedData inside user store : ",userInfo.value);
//     } catch (error) {
//         console.log(error);
//         userInfo.value = {};
//       }
//       isInitialized.value = true;
//     }
//   }

//   function setUserInfo(newUserInfo) {
//     if (typeof window !== 'undefined') {
//       userInfo.value = newUserInfo;
//       userInfoCookie.value = newUserInfo;
//     }
//   }

//   function clearUserInfo() {
//     if (typeof window !== 'undefined') {
//       userInfo.value = {};
//       userInfoCookie.value = null;
//     }
//   }

//   // Getters
//   const userName = computed(() => userInfo.value.name || '');
//   const userUsername = computed(() => userInfo.value.username || '');
//   const userId = computed(() => userInfo.value.id || '');

//   return {
//     userInfo,
//     isInitialized,
//     initialize,
//     setUserInfo,
//     clearUserInfo,
//     userName,
//     userUsername,
//     userId,
//   };
// });



import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useCookie } from '#app';

export const userStore = defineStore('user', () => {
  // State
  const userInfo = ref({});
  const isInitialized = ref(false);

  // Cookie for userInfo
  const userInfoCookie = useCookie('userInfo');

  // Actions
  function initialize() {
    if (typeof window !== 'undefined') {
      const cookieData = userInfoCookie.value;
      console.log("cookieData inside user store: ", cookieData);
      try {
        // Check if cookieData is a string that needs parsing
        const decodedData = typeof cookieData === 'string'
          ? JSON.parse(cookieData)
          : cookieData || {};
          console.log("decodedData before userInfoo.vlue inside user store: ", decodedData);
        userInfo.value = decodedData;
        console.log("decodedData inside user store: ", userInfo.value);
      } catch (error) {
        console.log(error);
        userInfo.value = {};
      }
      isInitialized.value = true;
    }
  }

  function setUserInfo(newUserInfo) {
    if (typeof window !== 'undefined') {
      userInfo.value = newUserInfo;
      // Convert newUserInfo to a JSON string before saving it to the cookie
      userInfoCookie.value = JSON.stringify(newUserInfo);
    }
  }

  function clearUserInfo() {
    if (typeof window !== 'undefined') {
      userInfo.value = {};
      userInfoCookie.value = null;
    }
  }

  // Getters
  const userName = computed(() => userInfo.value.name || '');
  const userUsername = computed(() => userInfo.value.username || '');
  const userId = computed(() => userInfo.value.id || '');

  return {
    userInfo,
    isInitialized,
    initialize,
    setUserInfo,
    clearUserInfo,
    userName,
    userUsername,
    userId,
  };
});

