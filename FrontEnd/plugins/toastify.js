import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      toast: {
        error: (text) => {
          return Toastify({
            text,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "rgba(255, 0, 0, 0.7)", 
              color: "white", 
              borderRadius: "8px", 
            },
          }).showToast();
        },
        success: (text) => {
          return Toastify({
            text,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "rgba(0, 255, 0, 0.7)", 
              color: "white",
              borderRadius: "8px",
            },
          }).showToast();
        },
      },
    },
  };
});
