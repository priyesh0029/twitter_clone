
import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useUserStore } from "~/stores/useUserStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  if (!userStore.isInitialized) {
    userStore.initialize();
  }

  const isAuthenticated = !!userStore.token;

  if (to.path === "/login" && isAuthenticated) {
    return navigateTo("/");
  } else if (to.path !== "/login" && !isAuthenticated) {
    return navigateTo("/login");
  }
  console.log("token from middleware: ", userStore.token);
});
