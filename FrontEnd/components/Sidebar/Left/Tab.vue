<template>
  <div
    class="flex items-center p-3 w-min text-black hover:bg-gray-200 dark:text-white dark:hover:bg-dim-200 transitionConfig rounded-full"
  >
    <div class="w-6 h-6">
      <slot name="icon"></slot>
    </div>
    <div class="ml-4 text-xl hidden lg:block" :class="textClasses">
      <slot name="name"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
const textClasses = computed(() => (props.active ? 'font-semibold' : 'font-normal'));
</script>
