<script setup>
import {POST_URL} from '../../utils/postUrl'
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  type :{
    type : String,
    required : false
  }
});

const baseUrl = computed(() => {
  return props.type === 'tweetView' ? POST_URL : '';
});
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    :items="props.items"
    :ui="{ item: 'basis-full' }"
    class="rounded-lg overflow-hidden max-h-72 lg:max-h-96 "
    arrows
    indicators
  >
  <img :src="baseUrl ? baseUrl + item : item" class="w-full h-full object-cover" draggable="false" />
  </UCarousel>
</template>
