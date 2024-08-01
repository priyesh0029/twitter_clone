<template>
    <div >
        <AuthPage>
            <AuthLoginForm/>
        </AuthPage>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
  layout: 'auth',
  // middleware : 'auth'
})
  </script>