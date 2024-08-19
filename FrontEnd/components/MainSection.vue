<template>
    <div class="border-x" :class="borderColorConfig">
       <div class="sticky top-0 px-4 py-3 bg-white/80 backdrop-blur-md dark:bg-black z-10">
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">{{props.title}}</h2>
       </div>
       
       <div>
        <slot></slot>
       </div>
    </div>
</template>

<script setup>

const {borderColorConfig} = useTailwindConfig()

const props = defineProps({
    title : {
        type : String,
        required : true
    },
})
</script>
