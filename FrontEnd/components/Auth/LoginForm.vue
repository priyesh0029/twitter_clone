<template>
    <div>
      <div class="md:pt-12 space-y-2">
        <UIInput 
          id="username" 
          v-model="username" 
          label="Username" 
          placeholder="@username" 
          type="text"
          :error="errors.username"
        />
        <UIInput 
          id="password" 
          v-model="password" 
          label="Password" 
          placeholder="Enter your password" 
          type="password"
          :error="errors.password"
        />
        <div>
          <UIButtonPost 
            class="mt-8" 
            liquid 
            :disabled="isButtonDisabled" 
            @click="handleLogin"
          >
            <span>Login</span>
          </UIButtonPost>
        </div>
        <p class="text-center">or</p>
        <div>
          <UIButtonPost 
            liquid 
            @click="handleSignUp"
          >
            <span>Signup</span>
          </UIButtonPost>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useForm, useField } from 'vee-validate';
  import { useUserStore } from "~/stores/user";
  import { useCookie } from '#app';
  import * as yup from 'yup';
  
  const { login } = useAuth();
  const userStore = useUserStore();

  
  const schema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
    // .min(6, 'Password must be at least 6 characters long'),
  });
  
  const { handleSubmit, errors, resetForm } = useForm({
    validationSchema: schema,
  });
  
  const { value: username } = useField('username');
  const { value: password } = useField('password');
  
  const handleLogin = handleSubmit(async (values) => {
   const response = await login(values);
   console.log("response of login from the backend : ",response);
   if(response){
    resetForm();
   userStore.setUserInfo(response.user);
          console.log("token form the backend :  ",response.token);
          const token = useCookie('token')
          token.value = response.token
          console.log("token.value : ",token.value);
          
          return navigateTo('/')
   }
   
  });
  
  const handleSignUp = () => {
    return navigateTo('/signup');
  };
  
  const isButtonDisabled = computed(() => {
    return !(username.value && password.value);
  });
  </script>
  
  