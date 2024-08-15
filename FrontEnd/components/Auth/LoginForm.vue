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
  import * as yup from 'yup';
  
  const { login } = useAuth();
  
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
    await login(values);
    resetForm();
  });
  
  const handleSignUp = () => {
    navigateTo('/signup');
  };
  
  const isButtonDisabled = computed(() => {
    return !(username.value && password.value);
  });
  </script>
  
  