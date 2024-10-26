<template>
  <div>
    <div v-if="isNoTweets">
       <div class="flex justify-center mt-10 bg-white dark:bg-black">
        <h1 class="text-black dark:text-white">No Tweets for you..!</h1>
       </div>
    </div>
    <div
      v-else
      v-for="tweet in tweets"
      :key="tweet.id"
      class="pb-4 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300 transitionConfig"
      :class="borderColorConfig"
    >
      <TweetSingleTweet :tweet="tweet" />
    </div>
  </div>
</template>

<script setup>

const {borderColorConfig} = useTailwindConfig()

const props = defineProps({
  page :{
    type: String,
    required : true
  },
  tweets :{
    type : Array,
    required : true
  },
})
console.log("props.page : ",props.page);
const isNoTweets = computed(()=> props.tweets.length === 0)

</script>
