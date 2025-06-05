<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="modelValue" class="fixed inset-0 bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity z-40" />
    </Transition>

    <!-- Modal -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto" @click="closeOnBackdrop">
        <div class="flex min-h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div 
            class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-900 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            :class="[size === 'large' ? 'sm:max-w-4xl' : 'sm:max-w-lg']"
          >
            <!-- Header -->
            <div class="bg-white dark:bg-gray-900 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                    <slot name="header">{{ title }}</slot>
                  </h3>
                </div>
                <!-- Close button -->
                <button 
                  @click="close"
                  class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                >
                  <span class="sr-only">Cerrar</span>
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Content -->
              <div class="mt-4">
                <slot></slot>
              </div>
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import { defineComponent } from 'vue';
import eventBus, { EventTypes } from '../utils/eventBus';

export default defineComponent({
  name: 'Modal',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'large'].includes(value)
    },
    closeOnClickOutside: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'close'],
  setup(props, { emit }) {
    const close = () => {
      emit('update:modelValue', false);
      emit('close');
      eventBus.emit(EventTypes.USER_ACTION, {
        action: 'modal_close',
        timestamp: new Date().toISOString()
      });
    };

    const closeOnBackdrop = (event) => {
      if (props.closeOnClickOutside && event.target === event.currentTarget) {
        close();
      }
    };

    return {
      close,
      closeOnBackdrop
    };
  }
});
</script> 