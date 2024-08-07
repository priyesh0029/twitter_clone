<template>
  <div>
    <div v-if="isNoTweets">
       <div class="flex justify-center mt-10 bg-white dark:bg-black">
        <h1 class="text-black dark:text-white">No Tweets for you..!</h1>
       </div>
    </div>
    <div
      v-else
      v-for="tweet in postDetails.posts"
      :key="tweet.id"
      class="pb-4 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300 transitionConfig"
      :class="borderColorConfig"
    >
      <TweetSingleTweet :tweet="tweet" />
    </div>
  </div>
</template>

<script setup>
import { usePostStore } from "~/stores/usePostStore";

const {borderColorConfig} = useTailwindConfig()
const loading = ref(false);
const { getTweets } = usePost();

const postDetails = usePostStore();


onBeforeMount(async () => {
  try {
    loading.value = true;
    const response = await getTweets();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});

const isNoTweets = computed(()=> postDetails.posts.length === 0)
</script>
