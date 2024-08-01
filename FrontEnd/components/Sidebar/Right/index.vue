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
      <SidebarRightPreviewCardItem
        v-for="(whoTofollow, index) in whoTofollowItems"
        :key="index"
      >
        <div class="flex flex-row justify-between p-2 items-center ">
          <div class="flex flex-row">
            <img
              class="w-10 h-10 rounded-full"
              :src="whoTofollow.image"
              :alt="whoTofollow.name"
            />
            <div class="flex flex-col ml-2">
              <h1 class="text-sm font-bold text-gray-900 dark:text-white">{{ whoTofollow.name }}</h1>
              <p class="text-xs text-gray-500">{{ whoTofollow.handle}}</p>
            </div>
          </div>
          <button class=" h-full bg-black rounded-full font-bold text-xs px-3 py-2 text-white dark:bg-white dark:text-black">Follow</button>
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

const whoTofollowItems = ref([
  {
    name: " joe Biden",
    handle: "@JoeBiden",
    image: "https://picsum.photos/200/200",
  },
]);
</script>
