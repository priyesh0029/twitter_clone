<template>
  <div class="flex h-screen bg-white dark:bg-black">
    <div class="relative flex-1 hidden w-0 md:block p-16">
      <!-- <img
        class="absolute inset-0 object-cover w-full h-full"
        src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?t=st=1722357127~exp=1722360727~hmac=1f3ba19b71d434a1497313ba380fdf4845bff3504431c1bb42cd91c90f7c50f2&w=740"
      /> -->
      <UIcon name="i-simple-icons-x" class="w-full h-full flex-shrink-0 " />

    </div>
    <div
      class="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <!-- <img
        class="md:hidden absolute inset-0 object-cover w-28 h-28"
        src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?t=st=1722357127~exp=1722360727~hmac=1f3ba19b71d434a1497313ba380fdf4845bff3504431c1bb42cd91c90f7c50f2&w=740"
      /> -->
      <UIcon name="i-simple-icons-x" class="md:hidden w-28 h-28 flex-shrink-0 p-4" />

      <div v-if="showPromo" class="item-center md:my-0 my-16 flex flex-col justify-center">
        <h1 class="text-5xl md:text-7xl font-extrabold">Happening Now</h1>
        <h4 class="text:2xl md:text-4xl font-extrabold mt-3">Join Today</h4>
      </div>
      <div
        class="flex w-full h-full max-w-sm mx-auto lg:w-96"
      >
        <slot> </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

const showPromo = computed(() => route.name !== 'signup')
</script>