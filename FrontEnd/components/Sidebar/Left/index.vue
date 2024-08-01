<template>
  <div class="h-screen flex flex-col">
    <div
      class="p-2 my-1 hover:bg-blue-50 rounded-full w-min dark:hover:bg-white/20 transitionConfig"
    >
      <nuxt-link to="/">
        <div class="w-8 h-8">
          <LogosTwitterLogo />
        </div>
      </nuxt-link>
    </div>
    <div class="">
      <SidebarLeftTab active>
        <template v-slot:icon>
          <HomeIcon />
        </template>
        <template v-slot:name> Home </template>
      </SidebarLeftTab>

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

      <SidebarLeftTab>
        <template v-slot:icon>
          <UserIcon />
        </template>
        <template v-slot:name> Profile </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <DotsCircleHorizontalIcon />
        </template>
        <template v-slot:name> More </template>
      </SidebarLeftTab>
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
} from "@heroicons/vue/solid"; // for solid icons
</script>
