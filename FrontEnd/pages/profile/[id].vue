<template>
    <div>
        <MainSection title="Profile"> 
            <ClientOnly>
                <Profile :userId="userId" class="w-full"/>
            </ClientOnly>            
        </MainSection>
    </div>
</template>

<script setup>
const route =  useRoute()
const userId = route.params.id || null

definePageMeta({
  middleware : 'auth'
})
</script>
