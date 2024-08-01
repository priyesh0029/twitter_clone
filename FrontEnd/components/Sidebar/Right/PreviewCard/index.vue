<template>
  <div class="m-2 border rounded-2xl bg-gray-50 dark:bg-dim-700 overflow-hidden" :class="borderColorConfig">
    <h1 class="p-3 text-xl font-extrabold text-gray-900 border-b dark:text-white">
        {{ props.title }}
    </h1>
    <slot></slot>
    <div class="p-3 text-sm text-blue-400 cursor-pointer hover:bg-gray-200 dark:hover:bg-dim-300 transitionConfig">
        Show more
    </div>
  </div>
</template>

<script setup>
const { borderColorConfig } = useTailwindConfig();
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
