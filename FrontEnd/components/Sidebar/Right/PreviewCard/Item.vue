<template>
    <div class="p-3 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300 transitionConfig" :class="borderColorConfig">
        <slot></slot>
    </div>
</template>

<script setup>

const {borderColorConfig} = useTailwindConfig()

</script>
