<template>
    <div class="flex p-4">
        <div v-if="tweet.profileImage">
            <img class="w-10 h-10 rounded-full" :src="tweet.profileImage"/>
        </div>
        <div v-else>
            <UserCircleIcon class="w-10 h-10" />
        </div>  
        <div class="ml-3">
            <span class="font-medium text-gray-800 dark:text-white">{{ tweet.user.name }}</span>
        </div>
        <span class="ml-3 text-sm font-medium text-gray-400">
            <nuxt-link to="#">@{{ tweet.user.username }}</nuxt-link>
            .{{humanReadableTime}}
        </span>
    </div>
</template>

<script setup>
import { UserCircleIcon } from "@heroicons/vue/solid";
import {humanizeTime} from "../../../utils/day"

const props = defineProps({
    tweet :{
        type : Object,
        required : true
    }
})

const humanReadableTime = humanizeTime(props.tweet.created_at);


</script>