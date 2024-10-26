<template>
  <div class="flex items-center text-gray-400 cursor-pointer group">
    <div
      :class="`p-2 rounded-full group-hover:${color}-100
       group-hover:text-${color}-400 dark:group-hover:bg-opacity-20 
       transitionConfig ${borderColorConfig}`"
    >
      <slot name="icon"  classes= "w-8 h-8" />
    </div>
    <span :class="`ml-1 group-hover:text-${color}-400`"> 
        <slot/>
         </span>
  </div>
</template>

<script setup>

const { borderColorConfig } = useTailwindConfig();

const props = defineProps({
    color : String,
    required : true
})
</script>
