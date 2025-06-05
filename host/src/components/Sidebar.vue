<template>
  <div>
    <!-- Botón de toggle para móvil -->
    <div class="lg:hidden fixed top-4 left-4 z-50">
      <button 
        @click="toggleSidebar" 
        class="p-2 rounded-md bg-white shadow-lg text-gray-600 hover:text-gray-900 transition-colors duration-200"
        :aria-label="isOpen ? 'Cerrar menú' : 'Abrir menú'"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Overlay para cerrar en móvil -->
    <div 
      v-if="isOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
      @click="toggleSidebar"
    ></div>

    <!-- Sidebar -->
    <aside 
      :class="[
        'fixed inset-y-0 left-0 z-40 bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 ease-in-out transform',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        isCollapsed ? 'w-20' : 'w-64',
        'lg:fixed'
      ]"
    >
      <div class="flex flex-col h-full">
        <!-- Header del Sidebar -->
        <div 
          :class="[
            'flex items-center h-16 transition-all duration-300',
            isCollapsed ? 'justify-center px-2' : 'px-4 justify-between',
            'bg-gradient-to-r from-indigo-600 to-indigo-800 relative overflow-hidden dark:from-indigo-800 dark:to-indigo-950'
          ]"
        >
          <div 
            class="flex items-center transition-all duration-300 relative z-10"
            :class="[isCollapsed ? 'justify-center w-full' : 'space-x-3']"
          >
            <div 
              class="flex-shrink-0 transition-all duration-300 relative"
              :class="[isCollapsed ? 'w-10 h-10' : 'w-8 h-8']"
            >
              <img 
                :src="logo" 
                alt="Logo" 
                class="w-full h-full object-contain transition-all duration-300"
              />
            </div>
            <h1 
              v-if="!isCollapsed"
              class="text-xl font-bold text-white truncate transition-opacity duration-200"
            >
              Universidad Atlantida
            </h1>
          </div>
          
          <!-- Botón para colapsar en desktop -->
          <button 
            @click="toggleCollapse"
            class="hidden lg:flex p-1.5 rounded-lg text-indigo-100 hover:text-white hover:bg-indigo-700/50 transition-colors duration-200 relative z-10"
          >
            <svg 
              class="w-5 h-5 transform transition-transform duration-200"
              :class="{ 'rotate-180': isCollapsed }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Decorative background elements -->
          <div 
            class="absolute inset-0 z-0 opacity-10"
            :class="{ 'scale-150': isCollapsed }"
          >
            <div class="absolute -inset-4 bg-gradient-to-r from-white/20 to-transparent rounded-full blur-2xl transform rotate-45"></div>
            <div class="absolute -inset-4 bg-gradient-to-l from-white/20 to-transparent rounded-full blur-2xl transform -rotate-45"></div>
          </div>
        </div>

        <!-- Navegación -->
        <nav class="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          <router-link 
            v-for="route in routes" 
            :key="route.path" 
            :to="route.path" 
            :class="[
              $route.path === route.path
                ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-200 border-indigo-500'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100 border-transparent',
              'group flex items-center text-sm font-medium rounded-lg transition-all duration-200 border-l-4 h-12',
              'relative px-3'
            ]"
            :title="isCollapsed ? route.name : ''"
          >
            <div class="flex items-center min-w-[2rem] h-6">
              <svg 
                class="w-6 h-6"
                :class="[
                  $route.path === route.path ? 'text-indigo-500 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400',
                  'transition-colors duration-200'
                ]"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  v-if="route.path === '/'" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
                <path 
                  v-else-if="route.path === '/admin'" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
                <path 
                  v-else-if="route.path === '/about'" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path 
                  v-else-if="route.path === '/noticias'" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14"
                />
              </svg>
            </div>
            <span 
              v-if="!isCollapsed" 
              class="ml-3 truncate transition-opacity duration-200"
            >
              {{ route.name }}
            </span>
          </router-link>
        </nav>

        <!-- Footer con perfil de usuario -->
        <div class="p-4 border-t border-gray-200 dark:border-gray-700">
          <div 
            :class="[
              'flex items-center',
              isCollapsed ? 'justify-center' : 'space-x-3'
            ]"
          >
            <div class="flex-shrink-0">
              <div class="relative">
                <div class="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                  <span class="text-white font-medium text-sm">US</span>
                </div>
                <div class="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"></div>
              </div>
            </div>
            <transition name="fade">
              <div v-if="!isCollapsed" class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white truncate">Usuario</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">En línea</p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import logo from '../assets/logo.svg'

const route = useRoute()
const isOpen = ref(false)
const isCollapsed = ref(false)
const isLargeScreen = ref(false)

const emit = defineEmits(['collapse'])

// Rutas con sus iconos
const routes = [
  {
    path: '/',
    name: 'Inicio'
  },
  {
    path: '/admin',
    name: 'Admin'
  },
  {
    path: '/about',
    name: 'Acerca de'
  },
  {
    path: '/noticias',
    name: 'Noticias'
  }
]

// Métodos
const toggleSidebar = () => {
  isOpen.value = !isOpen.value
  if (!isOpen.value) {
    isCollapsed.value = false
  }
}

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
  emit('collapse', isCollapsed.value)
}

// Detectar tamaño de pantalla
const checkScreenSize = () => {
  isLargeScreen.value = window.innerWidth >= 1024
  if (!isLargeScreen.value) {
    isCollapsed.value = false
    emit('collapse', false)
  }
}

// Lifecycle hooks
onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})

// Watch para emitir el estado inicial
watch(isCollapsed, (value) => {
  emit('collapse', value)
}, { immediate: true })
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Personalización de la barra de desplazamiento */
nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 2px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style> 