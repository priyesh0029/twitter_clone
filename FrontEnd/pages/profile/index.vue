<template>
    <div>
        <MainSection title="Home" :loading="loading"> 
            this is our profile page
        </MainSection>
        <li><NuxtLink to="/profile/123">profile</NuxtLink></li>
    </div>
</template>

<script setup>
const loading = ref(false)

</script>
