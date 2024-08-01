<template>
  <component :is="layout">
    <NuxtLayout />
  </component>
</template>

<script setup>
const route = useRoute()

const layout = computed(() => {
  if (route.name === 'login' || route.name === 'signup') {
    return 'auth'
  } else {
    return 'default'
  }
})
</script>
