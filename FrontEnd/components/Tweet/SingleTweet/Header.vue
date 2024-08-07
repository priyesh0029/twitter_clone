<template>
    <div class="flex p-4">
        <div v-if="props.tweet.profileImage">
            <img class="w-10 h-10 rounded-full" :src="props.tweet.profileImage"/>
        </div>
        <div v-else>
            <UserCircleIcon class="w-10 h-10" />
        </div>  
        <div class="ml-3">
            <span class="font-medium text-gray-800 dark:text-white">{{ props.tweet.User.name }}</span>
        </div>
        <span class="ml-3 text-sm font-medium text-gray-400">
            <nuxt-link to="#">@{{ props.tweet.User.username }}</nuxt-link>
            .{{humanReadableTime}}
        </span>
    </div>
</template>

<script setup>
import { UserCircleIcon } from "@heroicons/vue/solid";
import {humanizeTime} from "../../../utils/moment"

const props = defineProps({
    tweet :{
        type : Object,
        required : true
    }
})

const humanReadableTime = humanizeTime(props.tweet.createdAt);


</script>