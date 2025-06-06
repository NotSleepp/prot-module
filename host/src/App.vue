<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
    <template v-if="authStore.isAuthenticated">
      <Sidebar @collapse="handleCollapse" />
    </template>
    
    <!-- Contenido principal -->
    <div 
      :class="[
        'transition-all duration-500 ease-in-out min-h-screen',
        authStore.isAuthenticated ? (isCollapsed ? 'lg:ml-20' : 'lg:ml-80') : ''
      ]"
    >
      <!-- Header -->
      <header v-if="authStore.isAuthenticated" class="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div class="flex justify-between items-center h-16 px-6">
          <div v-if="authStore.user" class="text-gray-700 dark:text-gray-300">
            Bienvenido, <span class="font-semibold">{{ authStore.user.username }}</span>
          </div>
          <div class="flex items-center space-x-4">
            <button 
              @click="logout" 
              class="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 text-sm"
            >
              Cerrar sesión
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <!-- Contenido principal -->
      <main class="transition-all duration-500 ease-in-out">
        <div 
          :class="[
            'transition-all duration-500 ease-in-out',
            isCollapsed ? 'max-w-none px-6 py-6' : 'max-w-7xl mx-auto px-8 py-8'
          ]"
        >
          <router-view v-slot="{ Component }">
            <transition name="page" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>
    
    <NotificationListener />
  </div>
</template>

<script setup>
import ThemeToggle from './components/ThemeToggle.vue'
import Sidebar from './components/Sidebar.vue'
import { useThemeStore } from './stores/themeStore'
import { useAuthStore } from './stores/authStore'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import NotificationListener from 'remote/NotificationListener'

const router = useRouter()
const themeStore = useThemeStore()
const authStore = useAuthStore()
const isCollapsed = ref(false)

const handleCollapse = (value) => {
  isCollapsed.value = value
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}

onMounted(() => {
  themeStore.initTheme()
  authStore.checkAuth()
})
</script>

<style>
/* Transiciones globales mejoradas */
* {
  transition-property: color, background-color, border-color, box-shadow;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Transiciones de página más elegantes */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(1.02);
}

/* Optimizaciones tipográficas */
body {
  font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

html {
  scroll-behavior: smooth;
}

/* Scrollbar global más elegante */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #e5e7eb, #d1d5db);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #d1d5db, #9ca3af);
}

.dark ::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #374151, #4b5563);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #4b5563, #6b7280);
}

/* Mejoras de accesibilidad */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
