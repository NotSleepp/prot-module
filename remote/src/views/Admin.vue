<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <div class="bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
      <h2 class="text-2xl font-bold text-white mb-2">Admin View</h2>
      <img :src="img" alt="Logo" />
      <p class="text-purple-100">This is the admin view from the remote application!</p>
    </div>
    
    <div class="p-6">
      <div class="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div class="p-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Admin Panel</h3>
          <p class="text-gray-600 mb-6">
            This is a protected admin area loaded from the remote application.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Estadísticas -->
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <h4 class="text-sm font-medium text-blue-600 mb-2">Usuarios</h4>
              <p class="text-2xl font-bold text-blue-700">1,234</p>
              <p class="text-sm text-blue-500 mt-1">Total registrados</p>
            </div>
            
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <h4 class="text-sm font-medium text-purple-600 mb-2">Posts</h4>
              <p class="text-2xl font-bold text-purple-700">567</p>
              <p class="text-sm text-purple-500 mt-1">Publicados</p>
            </div>
            
            <div class="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <h4 class="text-sm font-medium text-green-600 mb-2">Visitas</h4>
              <p class="text-2xl font-bold text-green-700">89.3k</p>
              <p class="text-sm text-green-500 mt-1">Este mes</p>
            </div>
            
            <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
              <h4 class="text-sm font-medium text-orange-600 mb-2">Ingresos</h4>
              <p class="text-2xl font-bold text-orange-700">$12.5k</p>
              <p class="text-sm text-orange-500 mt-1">Último mes</p>
            </div>
          </div>
          
          <!-- Gráfico o contenido adicional -->
          <div class="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h4 class="text-lg font-semibold text-gray-800 mb-4">Actividad Reciente</h4>
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Nuevo usuario registrado</p>
                  <p class="text-sm text-gray-500">Hace 5 minutos</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Tarea completada</p>
                  <p class="text-sm text-gray-500">Hace 10 minutos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic here
import img from "../assets/hola.png";
</script>

<style scoped>
.admin-view {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin: 20px;
}

.admin-panel {
  margin-top: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.admin-content {
  margin-top: 15px;
}

.admin-stats {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.stat-item {
  flex: 1;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
  text-align: center;
}

.stat-item h4 {
  margin: 0;
  color: #666;
}

.stat-item p {
  margin: 10px 0 0;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
</style>
