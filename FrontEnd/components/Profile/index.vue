<template>
  <div class="flex flex-col items-center w-full mx-auto mt-8">
    
    <div class="relative group">
      <img 
       v-if="inputImageUrl"
        :src="inputImageUrl"
        alt="Profile Picture"
        class="w-32 h-32 rounded-full border border-gray-300"
      />
      <UserCircleIcon v-else class="w-32 h-32"/>
      <button
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
        class="absolute bottom-0 right-0 mb-2 mr-2 p-2 rounded-full shadow-md transition-opacity duration-300 group-hover:opacity-100 opacity-0"
      >
        <input
          type="file"
          class="hidden"
          ref="imageInput"
          accept="image/png,image/gif,image/jpeg"
          @change="handleImageChange"
        />
        <PencilAltIcon class="w-16 h-16 text-black" @click="handleImageClick" />
      </button>
    </div>

    <!-- User Info -->
    <div class="text-center mt-4">
      <div class="text-xl font-semibold">{{ userInfo.name }}</div>
      <div class="text-gray-500">@{{ userInfo.username }}</div>
      <div class="text-gray-400 mt-2 flex items-center justify-center">
        <CalendarIcon class="w-8 h-8 ml-2" />
        Joined {{formattedJoinDate}}
      </div>
      <div class="flex space-x-4 ml-2 mt-4">
        <div class="text-gray-600">
          Followers <span class="font-semibold text-black dark:text-white">{{followersCount}}</span>
        </div>
        <div class="text-gray-600">
          Following <span class="font-semibold text-black dark:text-white">{{ followingCount }}</span>
        </div>
      </div>

      
    </div>

    <!-- Tabs -->
    <div class="w-full mt-6 flex border-b border-gray-300">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        :class="{
          'text-blue-600 border-b-2 border-blue-600': activeTab === tab,
          'text-gray-600': activeTab !== tab,
        }"
        class="flex-1 py-2 text-center"
      >
        {{ tab }}
      </button>
    </div>
    <TweetListFeild page="'profile'" :tweets="tweets"/>
  </div>
</template>
  
  <script setup>
import { CalendarIcon, PencilAltIcon, PencilIcon, UserCircleIcon } from "@heroicons/vue/solid";
import moment from 'moment';

const {handleProfileDetails,changePropic} = useUser()

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
});
const imageInput = ref();
const inputImageUrl = ref(null);
const selectedFile = ref(null);
const userInfo = ref({});
const tweets = ref([]);


onBeforeMount(async () => {
  const response = await handleProfileDetails(props.userId);
  console.log('handleProfileDetails inside component profile: ', response);
  userInfo.value = response.data[0].user;
   tweets.value = response.data;
});

const tabs = ["Post", "Replies", "Highlight", "Likes", "Media", "Community"];
const activeTab = ref("Post");
const isHovered = ref(false);

async function handleImageChange(event) {
  const file = event.target.files[0];
  selectedFile.value = file;

  const reader = new FileReader();
  reader.onload = (event) => {
    inputImageUrl.value = event.target.result;
  };
  reader.readAsDataURL(file);

  const formData = {mediaFile : [selectedFile.value]}

  try {
    const response = await changePropic(formData)
    console.log(response);
    
  } catch (error) {
    
  }
}

function handleImageClick() {
  imageInput.value.click();
}

const formattedJoinDate = computed(() => {
  return userInfo.value.createdAt ? moment(userInfo.value.createdAt).format('MMMM YYYY') : '';
});

const followersCount = computed(() => {
  return userInfo.value.followers ? userInfo.value.followers.length : 0;
});

const followingCount = computed(() => {
  return userInfo.value.following ? userInfo.value.following.length : 0;
});

</script>
  

  