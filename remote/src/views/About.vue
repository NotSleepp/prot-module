<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
    <div class="bg-gradient-to-r from-green-500 to-teal-600 p-6">
      <h2 class="text-2xl font-bold text-white mb-2">About View</h2>
      <p class="text-green-100">This is the about view from the remote application!</p>
    </div>
    
    <div class="p-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div class="p-6">
          <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">About Us</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-8">
            This is a demonstration of Module Federation with Vue and Vite, showcasing
            how multiple applications can work together seamlessly.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-6 rounded-lg border border-green-200 dark:border-green-700 text-center">
              <div class="text-green-600 dark:text-green-400 mb-4">
                <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Dynamic Loading</h4>
              <p class="text-gray-600 dark:text-gray-300">Dynamic loading of remote components with seamless integration</p>
            </div>
            
            <div class="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30 p-6 rounded-lg border border-teal-200 dark:border-teal-700 text-center">
              <div class="text-teal-600 dark:text-teal-400 mb-4">
                <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Shared Dependencies</h4>
              <p class="text-gray-600 dark:text-gray-300">Efficient sharing of dependencies between host and remote</p>
            </div>
            
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-lg border border-blue-200 dark:border-blue-700 text-center">
              <div class="text-blue-600 dark:text-blue-400 mb-4">
                <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Independent Deployment</h4>
              <p class="text-gray-600 dark:text-gray-300">Deploy micro-frontends independently with confidence</p>
            </div>
          </div>
          
          <!-- Sección adicional -->
          <div class="mt-12 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Tecnologías Utilizadas</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <svg class="w-5 h-5 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>Vue 3</span>
              </div>
              <div class="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <svg class="w-5 h-5 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>Vite</span>
              </div>
              <div class="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <svg class="w-5 h-5 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>Tailwind CSS</span>
              </div>
              <div class="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <svg class="w-5 h-5 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>Module Federation</span>
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
</script>

<style scoped>
.about-view {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin: 20px;
}

.about-content {
  margin-top: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.feature {
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
  text-align: center;
}

.feature h4 {
  margin: 0;
  color: #333;
}

.feature p {
  margin: 10px 0 0;
  color: #666;
}
</style>
