<template>
  <div>
    <MainSection title="Home" :loading="loading">
      <div class="border-b" :class="borderColorConfig">
        <TweetForm />
      </div>
      <TweetListFeild/>
    </MainSection>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/useUserStore";

const {borderColorConfig} = useTailwindConfig()

const user = useUserStore();

const loading = ref(false);

onMounted(() => {
  user.initialize();
});
</script>




