<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <Sidebar />
    <div class="lg:ml-64 transition-all duration-300">
      <div class="p-4 flex justify-end">
        <ThemeToggle />
      </div>
      <main class="p-4">
        <router-view></router-view>
      </main>
    </div>
    <NotificationListener />
  </div>
</template>
 
<script setup>
import ThemeToggle from './components/ThemeToggle.vue';
import Sidebar from './components/Sidebar.vue';
import { useThemeStore } from './stores/themeStore';
import { onMounted } from 'vue';
import NotificationListener from 'remote/NotificationListener';

const themeStore = useThemeStore();

onMounted(() => {
  themeStore.initTheme();
});
</script>

<style>
/* Transiciones suaves para cambios de tema */
* {
  transition-property: color, background-color, border-color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
}
</style>
