<template>
    <div>
        <MainSection title="Profile" :loading="loading"> 
            <Profile :userId="userId" class="w-full"/>
        </MainSection>
    </div>
</template>

<script setup>
const loading = ref(false)
const route =  useRoute()
const userId = route.params._id || null

definePageMeta({
  middleware : 'auth'
})
</script>
