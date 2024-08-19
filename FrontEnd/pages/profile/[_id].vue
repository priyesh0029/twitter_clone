<template>
    <div>
        <MainSection title="Profile"> 
            <Profile :userId="userId" class="w-full"/>
        </MainSection>
    </div>
</template>

<script setup>
const route =  useRoute()
const userId = route.params._id || null

definePageMeta({
  middleware : 'auth'
})
</script>
