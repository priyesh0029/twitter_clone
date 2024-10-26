<template>
  <div>
    <div class="flex items-center flex-shrink-0 p-4 b-0">
      <div class="flex w-12 items-top">
        <img
          v-if="user.dp"
          :src="user.dp"
          class="inline-block w-10 h-10 rounded-full"
          alt=""
        />
        <UserCircleIcon v-else class="w-10 h-10" />
      </div>
      <div class="w-full p-2">
        <textarea
          v-model="text"
          class="w-full h-11 text-lg text-gray-900 placeholder:text-gray-400 bg-transparent border-0 dark:text-white focus:ring-0"
          placeholder="What's happening ?"
        ></textarea>
      </div>
    </div>
    <!-- FILE SELECTOR FOR THE ICON -->
    <div class="p-4 pl-16">
      <input
        type="file"
        class="hidden"
        ref="imageInput"
        accept="image/png,image/gif,image/jpeg"
        multiple
        @change="handleImageChange"
      />
    </div>
    <div class="px-10 lg:px-16">
      <TweetImageCarousel
        :items="inputImageUrls"
        class="rounded-2xl max-h-72"
        :class="borderColorConfig"
      />
    </div>
    <!-- ICONS -->
    <div class="flex p-2 pl-14">
      <div class="flex w-full text-white">
        <div
          @click="handleImageClick"
          class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800"
        >
          <LogosImageIcon />
        </div>
        <div
          class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800"
        >
          <LogosGifIcon />
        </div>
        <div
          class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800"
        >
          <LogosChartIcon />
        </div>
        <div
          class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800"
        >
          <LogosEmojiIcon />
        </div>
        <div
          class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800"
        >
          <LogosCalenderIcon />
        </div>
      </div>
      <div class="ml-auto">
        <UIButtonPost size="sm" :disabled = "isDisabled" @onClick="handleFormSubmit">
          <span class="font-bold">Tweet</span>
        </UIButtonPost>
      </div>
    </div>
  </div>
</template>

<script setup>
import { userStore } from "~/stores/userStore";
import { UserCircleIcon } from "@heroicons/vue/solid";

const { borderColorConfig } = useTailwindConfig();
const inputImageUrls = ref([]);
const imageInput = ref();
const selectedFiles = ref(null);
const emits = defineEmits(["onSubmit"]);
const user = userStore();
const text = ref("");

const isDisabled = computed(()=> text.value === '')

function handleFormSubmit() {
  emits("onSubmit", {
    text: text.value,
    mediaFiles: Object.values(selectedFiles.value),
  });
}

function handleImageClick() {
  imageInput.value.click();
}

function handleImageChange(event) {
  const files = event.target.files;
  selectedFiles.value = files;
  inputImageUrls.value = [];

  Array.from(files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      inputImageUrls.value.push(event.target.result);
    };
    reader.readAsDataURL(file);
  });
}

</script>
