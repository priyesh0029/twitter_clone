import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      toast: (options) => {
        return Toastify({
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          ...options, 
        });
      },
    },
  };
});
