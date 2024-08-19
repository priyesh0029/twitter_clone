import { useCookie } from '#app';

export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    const token = useCookie("token").value;

    console.log("Token from middleware: ", token);

    const isAuthenticated = !!token;

    if (to.path === "/login" && isAuthenticated) {
      return navigateTo("/");
    } else if (to.path !== "/login" && !isAuthenticated) {
      return navigateTo("/login");
    }
  }
});
