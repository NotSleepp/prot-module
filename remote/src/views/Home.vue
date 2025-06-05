<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Bienvenido a la Demo
        </h1>
        <p class="text-lg text-gray-500 dark:text-gray-400">
          Prueba las diferentes funcionalidades disponibles
        </p>
      </div>

      <!-- Controles -->
      <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <!-- Notificaciones -->
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              Notificaciones
            </h3>
            <div class="mt-5 space-y-3">
              <button
                @click="showSuccessNotification"
                class="w-full inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800"
              >
                Mostrar Éxito
              </button>
              <button
                @click="showErrorNotification"
                class="w-full inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
              >
                Mostrar Error
              </button>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              Modal
            </h3>
            <div class="mt-5">
              <button
                @click="showModal = true"
                class="w-full inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800"
              >
                Abrir Modal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Component -->
    <Modal v-model="showModal" title="Ejemplo de Modal">
      <div class="prose dark:prose-invert">
        <p class="text-gray-500 dark:text-gray-400">
          Este es un ejemplo de modal que soporta tema claro y oscuro.
          Puedes usar este componente en cualquier parte de la aplicación.
        </p>
      </div>
      <template #footer>
        <button
          @click="showModal = false"
          class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800"
        >
          Cerrar
        </button>
      </template>
    </Modal>
  </div>
</template>

<script>
import { ref } from 'vue';
import Modal from '../components/Modal.vue';
import eventBus, { EventTypes } from '../utils/eventBus';

export default {
  name: 'Home',
  components: {
    Modal
  },
  setup() {
    const showModal = ref(false);

    const showSuccessNotification = () => {
      eventBus.emit(EventTypes.SUCCESS, {
        message: '¡Operación completada con éxito!'
      });
    };

    const showErrorNotification = () => {
      eventBus.emit(EventTypes.ERROR, {
        message: 'Ha ocurrido un error en la operación'
      });
    };

    return {
      showModal,
      showSuccessNotification,
      showErrorNotification
    };
  }
};
</script>
