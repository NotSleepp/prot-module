<template>
  <div>
    <!-- Overlay para cerrar en móvil -->
    <div 
      v-if="isOpen" 
      class="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-30 transition-all duration-300"
      @click="toggleSidebar"
    ></div>

    <!-- Sidebar -->
    <aside 
      :class="[
        'fixed inset-y-0 left-0 z-40 shadow-2xl transition-all duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        isCollapsed ? 'w-16' : 'w-72',
        'lg:fixed',
        'bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800'
      ]"
    >
      <div class="flex flex-col h-full">
        <!-- Header del Sidebar -->
        <div 
          :class="[
            'flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900',
            'relative overflow-hidden'
          ]"
        >
          <!-- Logo fijo -->
          <div class="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 z-10">
            <span class="text-white font-bold text-sm">UA</span>
          </div>
          
          <!-- Texto del header -->
          <div 
            class="ml-12 transition-all duration-300 ease-in-out"
            :class="[
              isCollapsed ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
            ]"
          >
            <h1 class="text-gray-900 dark:text-white font-semibold text-lg leading-tight">Universidad Atlántida</h1>
            <p class="text-gray-500 dark:text-gray-400 text-xs">Portal Académico</p>
          </div>
        </div>

        <!-- Buscador -->
        <div class="p-4 border-b border-gray-200 dark:border-gray-800">
          <div 
            class="relative flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg h-10"
            @click="handleSearchClick"
          >
            <!-- Icono de búsqueda fijo -->
            <div class="absolute left-3 w-4 h-4 flex items-center justify-center">
              <svg class="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <!-- Input de búsqueda -->
            <input 
              type="text" 
              v-model="searchText" 
              placeholder="Buscar..." 
              class="w-full bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 pl-10 pr-3 h-full"
              :class="[
                isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
              ]"
              @focus="handleSearchFocus"
            />
          </div>
          
          <!-- Resultados de búsqueda -->
          <div v-if="searchResults.length > 0 && !isCollapsed" class="absolute left-4 right-4 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-80 overflow-y-auto z-50">
            <div 
              v-for="result in searchResults" 
              :key="result.path" 
              class="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
              @click="selectSearchResult(result)"
            >
              <div class="font-medium text-gray-900 dark:text-white text-sm">{{ result.name }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ result.section }}</div>
            </div>
          </div>
        </div>

        <!-- Botón de toggle sobresaliendo -->
        <button 
          @click="toggleCollapse"
          class="hidden lg:flex absolute top-4 -right-3 z-50 w-6 h-6 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-300 items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-white transition-all duration-200"
          :title="isCollapsed ? 'Expandir menú' : 'Contraer menú'"
        >
          <svg 
            class="w-3 h-3 transition-transform duration-200"
            :class="{ 'rotate-180': isCollapsed }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Navegación -->
        <nav class="flex-1 py-4 overflow-y-auto">
          <div class="space-y-1 px-2">
            <!-- Elementos de menú principales -->
            <router-link 
              to="/"
              :class="[
                $route.path === '/'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
                'flex items-center h-10 rounded-lg transition-all duration-200 relative group'
              ]"
              :title="isCollapsed ? 'Inicio' : ''"
            >
              <!-- Icono fijo -->
              <div class="absolute left-3 w-4 h-4 flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <!-- Texto -->
              <div 
                class="ml-10 flex-1 text-sm font-medium transition-all duration-300"
                :class="[
                  isCollapsed ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
                ]"
              >
                Inicio
              </div>
            </router-link>

            <router-link 
              to="/noticias"
              :class="[
                $route.path === '/noticias'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
                'flex items-center h-10 rounded-lg transition-all duration-200 relative group'
              ]"
              :title="isCollapsed ? 'Noticias' : ''"
            >
              <!-- Icono fijo -->
              <div class="absolute left-3 w-4 h-4 flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14" />
                </svg>
              </div>
              <!-- Texto -->
              <div 
                class="ml-10 flex-1 text-sm font-medium transition-all duration-300"
                :class="[
                  isCollapsed ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
                ]"
              >
                Noticias
              </div>
              <!-- Notificación -->
              <div 
                class="absolute right-3 transition-all duration-300"
                :class="[
                  isCollapsed ? 'opacity-0' : 'opacity-100'
                ]"
              >
                <div class="bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[1.25rem] text-center">
                  3
                </div>
              </div>
              <!-- Indicador de notificación cuando está colapsado -->
              <div 
                v-if="isCollapsed"
                class="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"
              ></div>
            </router-link>

            <!-- Separador visual -->
            <div class="h-px bg-gray-200 dark:bg-gray-700 mx-2 my-3"></div>

            <!-- Estudiantes con submenú -->
            <div>
              <button
                @click="toggleSubmenu('estudiantes')"
                :class="[
                  'w-full flex items-center h-10 rounded-lg transition-all duration-200 relative group',
                  expandedMenus.estudiantes 
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                ]"
                :title="isCollapsed ? 'Estudiantes' : ''"
              >
                <!-- Icono fijo -->
                <div class="absolute left-3 w-4 h-4 flex items-center justify-center">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <!-- Texto -->
                <div 
                  class="ml-10 flex-1 text-left text-sm font-medium transition-all duration-300"
                  :class="[
                    isCollapsed ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
                  ]"
                >
                  Estudiantes
                </div>
                <!-- Flecha -->
                <div 
                  class="absolute right-3 w-4 h-4 flex items-center justify-center transition-all duration-300"
                  :class="[
                    isCollapsed ? 'opacity-0' : 'opacity-100'
                  ]"
                >
                  <svg 
                    class="w-3 h-3 transition-transform duration-200"
                    :class="{ 'rotate-180': expandedMenus.estudiantes }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <!-- Submenú -->
              <div 
                class="overflow-hidden transition-all duration-300"
                :class="[
                  !isCollapsed && expandedMenus.estudiantes ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                ]"
              >
                <div class="ml-6 mt-1 space-y-1">
                  <router-link
                    to="/estudiantes"
                    :class="[
                      $route.path === '/estudiantes'
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
                      'flex items-center h-8 px-3 rounded-md text-sm transition-all duration-200'
                    ]"
                  >
                    <div class="w-1.5 h-1.5 rounded-full bg-current mr-3 opacity-60"></div>
                    Listado
                  </router-link>
                  <router-link
                    to="/inscripciones"
                    :class="[
                      $route.path === '/inscripciones'
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
                      'flex items-center h-8 px-3 rounded-md text-sm transition-all duration-200'
                    ]"
                  >
                    <div class="w-1.5 h-1.5 rounded-full bg-current mr-3 opacity-60"></div>
                    Inscripciones
                  </router-link>
                  <router-link
                    to="/asistencia"
                    :class="[
                      $route.path === '/asistencia'
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
                      'flex items-center h-8 px-3 rounded-md text-sm transition-all duration-200'
                    ]"
                  >
                    <div class="w-1.5 h-1.5 rounded-full bg-current mr-3 opacity-60"></div>
                    Asistencia
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Carreras con submenú -->
            <div>
              <button
                @click="toggleSubmenu('carreras')"
                :class="[
                  'w-full flex items-center h-10 rounded-lg transition-all duration-200 relative group',
                  expandedMenus.carreras 
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                ]"
                :title="isCollapsed ? 'Carreras' : ''"
              >
                <!-- Icono fijo -->
                <div class="absolute left-3 w-4 h-4 flex items-center justify-center">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <!-- Texto -->
                <div 
                  class="ml-10 flex-1 text-left text-sm font-medium transition-all duration-300"
                  :class="[
                    isCollapsed ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
                  ]"
                >
                  Carreras
                </div>
                <!-- Flecha -->
                <div 
                  class="absolute right-3 w-4 h-4 flex items-center justify-center transition-all duration-300"
                  :class="[
                    isCollapsed ? 'opacity-0' : 'opacity-100'
                  ]"
                >
                  <svg 
                    class="w-3 h-3 transition-transform duration-200"
                    :class="{ 'rotate-180': expandedMenus.carreras }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <!-- Submenú -->
              <div 
                class="overflow-hidden transition-all duration-300"
                :class="[
                  !isCollapsed && expandedMenus.carreras ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                ]"
              >
                <div class="ml-6 mt-1 space-y-1">
                  <router-link
                    to="/planes"
                    :class="[
                      $route.path === '/planes'
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
                      'flex items-center h-8 px-3 rounded-md text-sm transition-all duration-200'
                    ]"
                  >
                    <div class="w-1.5 h-1.5 rounded-full bg-current mr-3 opacity-60"></div>
                    Planes de estudio
                  </router-link>
                  <router-link
                    to="/materias"
                    :class="[
                      $route.path === '/materias'
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
                      'flex items-center h-8 px-3 rounded-md text-sm transition-all duration-200'
                    ]"
                  >
                    <div class="w-1.5 h-1.5 rounded-full bg-current mr-3 opacity-60"></div>
                    Materias
                  </router-link>
                </div>
              </div>
            </div>

            <router-link 
              to="/calendario"
              :class="[
                $route.path === '/calendario'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
                'flex items-center h-10 rounded-lg transition-all duration-200 relative group'
              ]"
              :title="isCollapsed ? 'Calendario' : ''"
            >
              <!-- Icono fijo -->
              <div class="absolute left-3 w-4 h-4 flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <!-- Texto -->
              <div 
                class="ml-10 flex-1 text-sm font-medium transition-all duration-300"
                :class="[
                  isCollapsed ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
                ]"
              >
                Calendario
              </div>
            </router-link>

            <!-- Separador visual -->
            <div class="h-px bg-gray-200 dark:bg-gray-700 mx-2 my-3"></div>

            <router-link 
              to="/admin"
              :class="[
                $route.path === '/admin'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
                'flex items-center h-10 rounded-lg transition-all duration-200 relative group'
              ]"
              :title="isCollapsed ? 'Administración' : ''"
            >
              <!-- Icono fijo -->
              <div class="absolute left-3 w-4 h-4 flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <!-- Texto -->
              <div 
                class="ml-10 flex-1 text-sm font-medium transition-all duration-300"
                :class="[
                  isCollapsed ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
                ]"
              >
                Administración
              </div>
            </router-link>

            <!-- Informes con submenú -->
            <div>
              <button
                @click="toggleSubmenu('informes')"
                :class="[
                  'w-full flex items-center h-10 rounded-lg transition-all duration-200 relative group',
                  expandedMenus.informes 
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                ]"
                :title="isCollapsed ? 'Informes' : ''"
              >
                <!-- Icono fijo -->
                <div class="absolute left-3 w-4 h-4 flex items-center justify-center">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <!-- Texto -->
                <div 
                  class="ml-10 flex-1 text-left text-sm font-medium transition-all duration-300"
                  :class="[
                    isCollapsed ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
                  ]"
                >
                  Informes
                </div>
                <!-- Flecha -->
                <div 
                  class="absolute right-3 w-4 h-4 flex items-center justify-center transition-all duration-300"
                  :class="[
                    isCollapsed ? 'opacity-0' : 'opacity-100'
                  ]"
                >
                  <svg 
                    class="w-3 h-3 transition-transform duration-200"
                    :class="{ 'rotate-180': expandedMenus.informes }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <!-- Submenú -->
              <div 
                class="overflow-hidden transition-all duration-300"
                :class="[
                  !isCollapsed && expandedMenus.informes ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                ]"
              >
                <div class="ml-6 mt-1 space-y-1">
                  <router-link
                    to="/informes/rendimiento"
                    :class="[
                      $route.path === '/informes/rendimiento'
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
                      'flex items-center h-8 px-3 rounded-md text-sm transition-all duration-200'
                    ]"
                  >
                    <div class="w-1.5 h-1.5 rounded-full bg-current mr-3 opacity-60"></div>
                    Rendimiento
                  </router-link>
                  <router-link
                    to="/informes/financiero"
                    :class="[
                      $route.path === '/informes/financiero'
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
                      'flex items-center h-8 px-3 rounded-md text-sm transition-all duration-200'
                    ]"
                  >
                    <div class="w-1.5 h-1.5 rounded-full bg-current mr-3 opacity-60"></div>
                    Financiero
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Separador visual -->
            <div class="h-px bg-gray-200 dark:bg-gray-700 mx-2 my-3"></div>

            <router-link 
              to="/documentacion"
              :class="[
                $route.path === '/documentacion'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
                'flex items-center h-10 rounded-lg transition-all duration-200 relative group'
              ]"
              :title="isCollapsed ? 'Documentación' : ''"
            >
              <!-- Icono fijo -->
              <div class="absolute left-3 w-4 h-4 flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <!-- Texto -->
              <div 
                class="ml-10 flex-1 text-sm font-medium transition-all duration-300"
                :class="[
                  isCollapsed ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
                ]"
              >
                Documentación
              </div>
            </router-link>

            <router-link 
              to="/biblioteca"
              :class="[
                $route.path === '/biblioteca'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
                'flex items-center h-10 rounded-lg transition-all duration-200 relative group'
              ]"
              :title="isCollapsed ? 'Biblioteca' : ''"
            >
              <!-- Icono fijo -->
              <div class="absolute left-3 w-4 h-4 flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13m0-13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <!-- Texto -->
              <div 
                class="ml-10 flex-1 text-sm font-medium transition-all duration-300"
                :class="[
                  isCollapsed ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
                ]"
              >
                Biblioteca
              </div>
            </router-link>

            <router-link 
              to="/about"
              :class="[
                $route.path === '/about'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
                'flex items-center h-10 rounded-lg transition-all duration-200 relative group'
              ]"
              :title="isCollapsed ? 'Acerca de' : ''"
            >
              <!-- Icono fijo -->
              <div class="absolute left-3 w-4 h-4 flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <!-- Texto -->
              <div 
                class="ml-10 flex-1 text-sm font-medium transition-all duration-300"
                :class="[
                  isCollapsed ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
                ]"
              >
                Acerca de
              </div>
            </router-link>
          </div>
        </nav>

        <!-- Pie con perfil de usuario -->
        <div class="p-4 border-t border-gray-200 dark:border-gray-800">
          <div class="flex items-center">
            <!-- Avatar fijo -->
            <div class="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span class="text-white font-bold text-sm">UA</span>
            </div>
            
            <!-- Info del usuario -->
            <div 
              class="ml-3 transition-all duration-300"
              :class="[
                isCollapsed ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
              ]"
            >
              <p class="text-gray-900 dark:text-white text-sm font-medium">Usuario Administrador</p>
              <p class="text-gray-500 dark:text-gray-400 text-xs">En línea</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isOpen = ref(false)
const isCollapsed = ref(false)
const isLargeScreen = ref(false)

const emit = defineEmits(['collapse'])

const searchText = ref('')
const searchResults = ref([])

// Estado de submenús expandidos
const expandedMenus = ref({
  estudiantes: false,
  carreras: false,
  informes: false
})

// Método para manejar el clic en la búsqueda cuando está colapsado
const handleSearchClick = () => {
  if (isCollapsed.value) {
    isCollapsed.value = false
    emit('collapse', false)
  }
}

// Método para manejar el foco en la búsqueda
const handleSearchFocus = () => {
  if (isCollapsed.value) {
    isCollapsed.value = false
    emit('collapse', false)
  }
}

// Método para buscar en el menú
const searchInMenu = (text) => {
  if (!text || text.length < 2) {
    searchResults.value = []
    return
  }
  
  const results = []
  const searchTerm = text.toLowerCase()
  
  // Lista de elementos para buscar
  const menuItems = [
    { name: 'Inicio', path: '/', section: 'Principal' },
    { name: 'Noticias', path: '/noticias', section: 'Principal' },
    { name: 'Estudiantes', path: '/estudiantes', section: 'Académico' },
    { name: 'Inscripciones', path: '/inscripciones', section: 'Académico > Estudiantes' },
    { name: 'Asistencia', path: '/asistencia', section: 'Académico > Estudiantes' },
    { name: 'Carreras', path: '/carreras', section: 'Académico' },
    { name: 'Planes de estudio', path: '/planes', section: 'Académico > Carreras' },
    { name: 'Materias', path: '/materias', section: 'Académico > Carreras' },
    { name: 'Calendario', path: '/calendario', section: 'Académico' },
    { name: 'Administración', path: '/admin', section: 'Administración' },
    { name: 'Informes', path: '/informes', section: 'Administración' },
    { name: 'Rendimiento', path: '/informes/rendimiento', section: 'Administración > Informes' },
    { name: 'Financiero', path: '/informes/financiero', section: 'Administración > Informes' },
    { name: 'Documentación', path: '/documentacion', section: 'Información' },
    { name: 'Biblioteca', path: '/biblioteca', section: 'Información' },
    { name: 'Acerca de', path: '/about', section: 'Información' }
  ]
  
  menuItems.forEach(item => {
    if (item.name.toLowerCase().includes(searchTerm)) {
      results.push(item)
    }
  })
  
  searchResults.value = results.slice(0, 5)
}

// Método para seleccionar resultado de búsqueda
const selectSearchResult = (result) => {
  searchText.value = ''
  searchResults.value = []
}

// Watch para la búsqueda con debounce
const debounce = (fn, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

const debouncedSearch = debounce(searchInMenu, 300)

watch(searchText, (newValue) => {
  debouncedSearch(newValue)
})

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
  
  // Cerrar todos los submenús cuando se colapsa
  if (isCollapsed.value) {
    expandedMenus.value = {
      estudiantes: false,
      carreras: false,
      informes: false
    }
  }
}

const toggleSubmenu = (menuKey) => {
  if (isCollapsed.value) {
    // Si está colapsado, primero expandir la barra lateral
    isCollapsed.value = false
    emit('collapse', false)
    // Esperar a que se expanda la barra lateral antes de expandir el submenú
    setTimeout(() => {
      expandedMenus.value[menuKey] = true
    }, 300)
  } else {
    // Cerrar otros submenús
    Object.keys(expandedMenus.value).forEach(key => {
      if (key !== menuKey) {
        expandedMenus.value[key] = false
      }
    })
    expandedMenus.value[menuKey] = !expandedMenus.value[menuKey]
  }
}

// Detectar tamaño de pantalla
const checkScreenSize = () => {
  isLargeScreen.value = window.innerWidth >= 1024
  if (!isLargeScreen.value) {
    isCollapsed.value = false
    emit('collapse', false)
  }
}

// Hooks de ciclo de vida
onMounted(() => {
  window.addEventListener('resize', checkScreenSize)
  checkScreenSize()
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
/* Transiciones suaves y profesionales */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Scrollbar personalizado */
nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600;
  border-radius: 2px;
}

nav::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
}

/* Optimización de rendimiento */
aside {
  will-change: width;
  backface-visibility: hidden;
  transform: translateZ(0);
}

/* Estados de hover más sutiles */
.group:hover {
  transform: none;
}

/* Asegurar que los iconos nunca se muevan */
.absolute {
  position: absolute !important;
}
</style>
