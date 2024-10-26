<template>
  <div class="flex flex-col">
    <!-- preview card - whats happening -->
    <SidebarRightPreviewCard title="What's Happening">
      <SidebarRightPreviewCardItem
        v-for="(WhatsHappening, index) in whatsHappeningItems"
        :key="index"
      >
        <h2 class="font-bold text-gray-800 text-md dark:text-white">
          {{ WhatsHappening.item }}
        </h2>
        <p class="text-xs text-gray-500">{{ WhatsHappening.count }}</p>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>

    <!-- preview card - who to follow -->
    <SidebarRightPreviewCard title="Who to follow">
      <div class="flex justify-center mt-8" v-if="loading">
          <UISpinner/>
      </div>
      <SidebarRightPreviewCardItem
      v-else
        v-for="(whoToFollow, index) in whoTofollowItems"
        :key="index"
      >
        <div class="flex flex-row justify-between p-2 items-center ">
          <div class="flex flex-row">
            <img
              class="w-10 h-10 rounded-full"
              :src="whoToFollow.image"
              :alt="whoToFollow.name"
            />
            <div class="flex flex-col ml-2">
              <h1 class="text-sm font-bold text-gray-900 dark:text-white">{{ whoToFollow.name }}</h1>
              <p class="text-xs text-gray-500">{{ whoToFollow.username}}</p>
            </div>
          </div>
          <UIFollowButton @click="handleFollow(index,whoToFollow.id)">
            {{ whoToFollow.buttonState }}
          </UIFollowButton>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>
  </div>
</template>

<script setup>


const whatsHappeningItems = ref([
  { item: "SpaceX", count: "18.8k Tweets" },
  { item: "SpaceX", count: "18.8k" },
]);

const { whoTofollow,handleFollowUnfollow} = useUser();

const whoTofollowItems = ref([]);
const loading = ref(false)

// fetchData();
const { data: whoToFollow, error, status } = await useAsyncData('whoToFollow', () => {
  try {
    return whoTofollow();    
  } catch (err) {
    console.error('Error fetching tweets:', err);
    throw err;
  }
});

console.log("who to follow from whotofollow composable : ",whoToFollow.value);


if (error.value) {
  console.error('Failed to load tweets:', error.value.message);
} else {
  whoTofollowItems.value = whoToFollow.value.map(item => ({
      ...item,
      buttonState: 'follow'
    }));
}

loading.value = status.value !== "success";


//to setup follow unfollow function
async function handleFollow(index,userId) {
  const item = whoTofollowItems.value[index];
  const buttonState = item.buttonState
  try {
  item.buttonState = item.buttonState === 'follow' ? 'unfollow' : 'follow';
  const response = await handleFollowUnfollow(userId)
  console.log("response from handle folloe unfollw : ", response);
  } catch (error) {
    item.buttonState = buttonState
    console.log(error);
    
  }
  
}
</script>
