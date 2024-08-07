<template>
    <div>
       <div v-if="loading" class="flex items-center justify-center py-6">
        <UISpinner/>
       </div>
       <div v-else>
        <TweetInput @onSubmit="handleFormSubmit"/>
       </div>
    </div>
</template>

<script setup>
const loading = ref(false)
const {createTweet} = usePost()
async function handleFormSubmit(data){
   try{
    loading.value = true
        const response = await createTweet({
            text : data.text,
            mediaFiles : data?.mediaFiles
        })
        console.log(response);
   }catch(error){
    console.log(error);
   }finally{
    loading.value = false
   }
}
</script>
