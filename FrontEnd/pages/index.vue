<template>
  <div>
    <MainSection title="Home">
      <div class="border-b" :class="borderColorConfig">
        <TweetForm />
      </div>
      <TweetListFeild page="Home" :tweets="tweets" />
    </MainSection>
  </div>
</template>

<script setup>
import { tweetStore } from '~/stores/tweetStore';
import { usePost } from '~/composables/usePost'; 

const { borderColorConfig } = useTailwindConfig();
const { getTweets } = usePost();
const postDetails = tweetStore();

const tweets = computed(() => postDetails.posts); 

const {
  data: tweetArray,
  error,
  status,
} = await useAsyncData('tweets',() => {
  try {
    return getTweets();
  } catch (err) {
    console.error('Error fetching tweets:', err);
    throw err;
  }
});
console.log("tweets : ",tweetArray);

if (error.value) {
  console.error('Failed to load tweets:', error.value.message);
} else {
  postDetails.setPosts(tweetArray.value.data);
}

definePageMeta({
  middleware: 'auth',
});
</script>
