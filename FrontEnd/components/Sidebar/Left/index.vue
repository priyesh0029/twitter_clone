<template>
  <div class="h-screen flex flex-col">
    <div
      class="p-2 my-1 hover:bg-blue-50 rounded-full w-min dark:hover:bg-white/20 transitionConfig"
    >
      <nuxt-link to="/">
        <div>
          <UIcon name="i-simple-icons-x" class="w-10 h-10 flex-shrink-0" />
        </div>
      </nuxt-link>
    </div>
    <div class="">
      <nuxt-link :to="'/'">
        <SidebarLeftTab active>
          <template v-slot:icon>
            <HomeIcon />
          </template>
          <template v-slot:name> Home </template>
        </SidebarLeftTab>
      </nuxt-link>

      <SidebarLeftTab>
        <template v-slot:icon>
          <HashtagIcon />
        </template>
        <template v-slot:name> Explore </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <BellIcon />
        </template>
        <template v-slot:name> Notifications </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <InboxIcon />
        </template>
        <template v-slot:name> Messages </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <DocumentTextIcon />
        </template>
        <template v-slot:name> Grok </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <UserGroupIcon />
        </template>
        <template v-slot:name> Communities </template>
      </SidebarLeftTab>

      <nuxt-link :to="`/profile/${userId}`">
        <SidebarLeftTab>
          <template v-slot:icon>
            <UserIcon />
          </template>
          <template v-slot:name> Profile </template>
        </SidebarLeftTab>
      </nuxt-link>

      <SidebarLeftTab>
        <template v-slot:icon>
          <DotsCircleHorizontalIcon />
        </template>
        <template v-slot:name> More </template>
      </SidebarLeftTab>

      <div class="ml-2">
        <ClientOnly>
          <UButton
            :icon="
              isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
            "
            color="gray"
            variant="ghost"
            aria-label="Theme"
            @click="isDark = !isDark"
          />
          <template #fallback>
            <div class="w-8 h-8"></div>
          </template>
        </ClientOnly>
      </div>

      <div class="hidden lg:block">
        <UIButtonPost liquid siz="lg"
          ><span class="font-bold">Tweet</span></UIButtonPost
        >
      </div>
      <div class="block lg:hidden">
        <UIButtonPost
          ><div class="font-bold w-6 h-6"><PencilIcon /></div
        ></UIButtonPost>
      </div>
       <nuxt-link :to="'/login'" >
        <SidebarLeftTab active @click="handleLogout">
          <template v-slot:icon>
            <LogoutIcon />
          </template>
          <template v-slot:name> Logout </template>
        </SidebarLeftTab>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import {
  HomeIcon,
  HashtagIcon,
  UserIcon,
  BellIcon,
  InboxIcon,
  DotsCircleHorizontalIcon,
  UserGroupIcon,
  DocumentTextIcon,
  PencilIcon,
  LogoutIcon
} from "@heroicons/vue/solid"; // for solid icons
import { computed } from "vue";
import { useUserStore } from "~/stores/useUserStore";

const userStore = useUserStore();
const colorMode = useColorMode();

const userId = computed(() => {
  return userStore.userInfo.id;
});
const user = computed(() => {
  return userStore.userInfo.name;
});

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const handleLogout = ()=>{
  userStore.clearUserInfo()
   userStore.clearToken()
}
</script>
