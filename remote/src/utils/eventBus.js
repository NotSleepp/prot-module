import mitt from 'mitt';

const emitter = mitt();

// Definir tipos de eventos para mejor autocompletado
export const EventTypes = {
  USER_ACTION: 'user-action',
  NAVIGATION: 'navigation',
  DATA_UPDATED: 'data-updated',
  ERROR: 'error',
  SUCCESS: 'success',
  NOTIFICATION: 'notification'
};

// Wrapper para tipado y logging
const eventBus = {
  emit(type, payload) {
    // Validar que el tipo de evento existe
    if (!Object.values(EventTypes).includes(type)) {
      console.warn(`[EventBus] Warning: Emitting undefined event type "${type}"`);
    }
    console.log(`[EventBus] Emitting ${type}:`, payload);
    emitter.emit(type, payload);
  },

  on(type, handler) {
    // Validar que el tipo de evento existe
    if (!Object.values(EventTypes).includes(type)) {
      console.warn(`[EventBus] Warning: Subscribing to undefined event type "${type}"`);
    }
    console.log(`[EventBus] Subscribing to ${type}`);
    emitter.on(type, handler);
    // Retornamos una función para desuscribirse
    return () => {
      console.log(`[EventBus] Unsubscribing from ${type}`);
      emitter.off(type, handler);
    };
  },

  off(type, handler) {
    // Validar que el tipo de evento existe
    if (!Object.values(EventTypes).includes(type)) {
      console.warn(`[EventBus] Warning: Removing handler for undefined event type "${type}"`);
    }
    console.log(`[EventBus] Removing handler for ${type}`);
    emitter.off(type, handler);
  }
};

export default eventBus; 