<template>
    <div class="border-x" :class="borderColorConfig">
       <div class="sticky top-0 px-4 py-3 bg-white/80 backdrop-blur-md dark:bg-black z-10">
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">{{props.title}}</h2>
       </div>
       <div v-if = "props.loading" class="items center flex justify-center p-4 border-b" :class="borderColorConfig">
            <UISpinner/>
       </div>
       <div v-else>
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
    loading : {
        type : Boolean,
        required : true
    }
})
</script>
