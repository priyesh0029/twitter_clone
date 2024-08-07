<template>
  <div>
    <div class="bg-white dark:bg-black">
      <!-- App -->
      <div class="min-h-full">
        <div
          class="grid grid-cols-12 mx-auto sm:px-3 lg:max-w-7xl lg:px-4 sm:gap-3 lg:gap-5"
        >
          <!-- LEFT-SIDEBAR -->
          <div class="hidden sm:block sm:col-span-1 lg:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft />
              <!-- <div>
                <ClientOnly>
                  <UButton
                    :icon="
                      isDark
                        ? 'i-heroicons-moon-20-solid'
                        : 'i-heroicons-sun-20-solid'
                    "
                    color="gray"
                    variant="ghost"
                    aria-label="Theme"
                    @click="isDark = !isDark"
                  />
                  <template #fallback>
                    <div class="w-8 h-8" ></div>
                  </template>
                </ClientOnly>
              </div> -->
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

</script>

<!-- <style scoped>
button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  background: var(--color-background);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
}
</style> -->
