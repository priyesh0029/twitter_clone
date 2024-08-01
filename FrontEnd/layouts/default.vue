<template>
    <div :class="{ dark: darkMode }">
      <div class="bg-white dark:bg-dim-900">
        <!-- App -->
        <div class="min-h-full">
          <div
            class="grid grid-cols-12 mx-auto sm:px-3 lg:max-w-7xl lg:px-4 sm:gap-3 lg:gap-5"
          >
            <!-- LEFT-SIDEBAR -->
            <div class="hidden sm:block sm:col-span-1 lg:col-span-2">
              <div class="sticky top-0">
                <SidebarLeft />
              </div>
            </div>
            <!-- MAIN CONTENT -->
            <main class="col-span-12 sm:col-span-7 lg:col-span-7">
              <NuxtPage />
            </main>
            <!-- RIGHT SIDEBAR -->
            <div class="hidden sm:block sm:col-span-4 lg:col-span-3">
              <div class="sticky top-0">
                <SidebarRight />
              </div>
            </div>
          </div>
        </div>
        <!-- <AuthPage  /> -->
      </div>
    </div>
  </template>
  
  <script setup>
  const darkMode = ref(false);
  </script>