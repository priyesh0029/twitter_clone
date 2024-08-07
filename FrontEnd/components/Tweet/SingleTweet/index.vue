<template>
    <div>
      <div>
        <TweetSingleTweetHeader :tweet="props.tweet"/>
      </div>
      <div class="ml-16 mb-2">
        <p class="flex-shrink w-auto font-medium text-gray-800 dark:text-white">
          {{ props.tweet.caption }}
        </p>
      </div>
  
      <div class="pl-14 pr-4 lg:pl-18">
        <TweetImageCarousel
          :items="props.tweet.imgNames"
          class="rounded-2xl max-h-72"
          :class="borderColorConfig"
          :type="'tweetView'"
        />
      </div>
      <div class="ml-16 mb-2 mt-2">
        <TweetSingleTweetActions/>
      </div>
    </div>
  </template>
  
  <script setup>
  
  const {borderColorConfig} = useTailwindConfig()
  const props = defineProps({
    tweet: {
      type: Object,
      required: true,
    }
  });
  </script>