<template>
  <div>
    <div v-if="loading" class="h-screen flex justify-center items-center">
      <UISpinner/>
    </div>
    <div v-if="isNoTweets">
       <div class="flex justify-center mt-10 bg-white dark:bg-black">
        <h1 class="text-black dark:text-white">No Tweets for you..!</h1>
       </div>
    </div>
    <div
      v-else
      v-for="tweet in props.tweets"
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

const props = defineProps({
  page :{
    type: String,
    required : true
  },
  tweets :{
    type : Array,
    required : true
  }
})
console.log("props.page : ",props.page);

// const tweets = computed(()=> props.page === 'profile'? props.tweets :postDetails.posts )


// onMounted(async () => {
//   try {
//     loading.value = true;
//     const response = await getTweets();
//   } catch (error) {
//     console.log(error);
//   } finally {
//     loading.value = false;
//   }
// });

// const isNoTweets = computed(()=> postDetails.posts.length === 0)
const isNoTweets = computed(()=> props.tweets.length === 0)

</script>
