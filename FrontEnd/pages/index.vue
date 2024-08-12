<template>
  <div>
    <MainSection title="Home" :loading="loading">
      <div class="border-b" :class="borderColorConfig">
        <TweetForm />
      </div>
      <!-- <TweetListFeild page="Home" :tweets="tweets"/> -->
      <TweetListFeild page="Home" :tweets="tweets"/>
    </MainSection>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/useUserStore";
// import { usePostStore } from "~/stores/usePostStore";


const {borderColorConfig} = useTailwindConfig()
const { getTweets } = usePost();


const user = useUserStore();
const loading = ref(false);
const postDetails = usePostStore();


onMounted(async() => {
  user.initialize();
  try {
    loading.value = true;
    const response = await getTweets();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});

const tweets = postDetails.posts


definePageMeta({
  middleware : 'auth'
})
</script>




