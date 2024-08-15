<template>
    <div class="flex justify-center items-center">
      <div class="md:pt-12 space-y-2">
        <div class="flex space-x-1">
          <UIInput 
            id="name" 
            v-model="name" 
            label="Name" 
            placeholder="@name" 
            :error="errors.name"
          />
          <UIInput 
            id="username" 
            v-model="username" 
            label="Username" 
            placeholder="@username" 
            :error="errors.username"
          />
        </div>
        <UIInput 
          id="email" 
          v-model="email" 
          label="E-mail" 
          placeholder="@e-mail" 
          :error="errors.email"
        />
        <UIInput 
          id="password" 
          v-model="password" 
          label="Password" 
          placeholder="Enter your password" 
          type="password"
          :error="errors.password"
        />
        <UIInput 
          id="repassword" 
          v-model="repassword" 
          label="Re-password" 
          placeholder="Re-enter your password" 
          type="password"
          :error="errors.repassword"
        />
  
        <div>
          <UIButtonPost 
            liquid 
            :disabled="isButtonDisabled" 
            @click="handleSignUp"
          >
            <span>Signup</span>
          </UIButtonPost>
        </div>
        <p class="text-center">or</p>
        <div class="flex justify-center items-center">
          <p>Already have an account!</p>
          <button @click="handleLogin" class="text-blue-500 underline ml-2 text-lg">Login</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useForm, useField } from 'vee-validate';
  import * as yup from 'yup';
  import { useAuth } from '~/composables/useAuth'; 
  
  const { signup } = useAuth();
  
  const schema = yup.object({
    name: yup.string().required('Name is required'),
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().required('Password is required'),
    // .min(6, 'Password must be at least 6 characters long'),
    repassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Re-enter your password'),
  });
  
  const { handleSubmit, errors, resetForm } = useForm({
    validationSchema: schema,
  });
  
  const { value: name } = useField('name');
  const { value: username } = useField('username');
  const { value: email } = useField('email');
  const { value: password } = useField('password');
  const { value: repassword } = useField('repassword');
  
  const handleSignUp = handleSubmit(async (values) => {
    try {
      console.log(values);
      await signup(values);
      resetForm();
    } catch (error) {
      console.log(error);
    }
  });
  
  const handleLogin = () => {
    navigateTo('/login');
  };
  
  const isButtonDisabled = computed(() => {
    return !(name.value && username.value && email.value && password.value && repassword.value);
  });
  </script>
  