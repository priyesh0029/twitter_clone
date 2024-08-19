<template>
  <div>
    <MainSection title="Home">
      <div class="border-b" :class="borderColorConfig">
        <TweetForm />
      </div>
      <TweetListFeild page="Home" :tweets="tweets" :loading="loading" />
    </MainSection>
  </div>
</template>

<script setup>
import { usePostStore } from "~/stores/post";
import { useCookie } from '#app';


const { borderColorConfig } = useTailwindConfig();
const { getTweets } = usePost();

const postDetails = usePostStore();
const tweets = ref([]);
const loading = ref(true);

const {
  data: tweetArray,
  error,
  status,
} = await useAsyncData("tweets", async () => {
  try {
    return await getTweets();
  } catch (err) {
    console.error("Error fetching tweets:", err);
    throw err;
  }
});

if (error.value) {
  console.error("Failed to load tweets:", error.value.message);
} else {
  postDetails.setPosts(tweetArray.value.data);
  tweets.value = postDetails.posts;
}

loading.value = status.value !== "success";
watch(
  () => postDetails.posts,
  (newPosts) => {
    tweets.value = newPosts;
  }
);

definePageMeta({
  middleware: "auth",
});
</script>
