<template>
    <div>
        <MainSection title="Home" :loading="loading"> 
            this is our homepage
        </MainSection>
        <li><NuxtLink to="/profile/123">profile</NuxtLink></li>
    </div>
</template>

<script setup>

// definePageMeta({
//   middleware : 'auth'
// })
const loading = ref(false)
// const router = useRouter();
function handleRoute (){
    navigateTo('/profile/123');
}
</script>




