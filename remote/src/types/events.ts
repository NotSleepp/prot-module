// Tipos de eventos disponibles
export enum EventType {
  USER_ACTION = 'user-action',
  NAVIGATION = 'navigation',
  DATA_UPDATED = 'data-updated',
  ERROR = 'error',
  SUCCESS = 'success',
  NOTIFICATION = 'notification',
  THEME_CHANGED = 'theme-changed',
  AUTH_STATE_CHANGED = 'auth-state-changed',
  MODAL_STATE_CHANGED = 'modal-state-changed'
}

// Interfaces para los payloads de eventos
export interface BaseEventPayload {
  timestamp: string;
}

export interface NavigationPayload extends BaseEventPayload {
  from: string;
  to: string;
  params?: Record<string, any>;
}

export interface ErrorPayload extends BaseEventPayload {
  message: string;
  code?: string;
  details?: any;
  stack?: string;
}

export interface SuccessPayload extends BaseEventPayload {
  message: string;
  data?: any;
}

export interface UserActionPayload extends BaseEventPayload {
  action: string;
  context?: string;
  data?: any;
}

export interface NotificationPayload extends BaseEventPayload {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  title?: string;
  duration?: number;
  dismissible?: boolean;
}

export interface ThemePayload extends BaseEventPayload {
  theme: 'light' | 'dark';
  source: 'user' | 'system';
}

export interface ModalStatePayload extends BaseEventPayload {
  id: string;
  state: 'open' | 'closed';
  data?: any;
}

// Tipo unión para todos los payloads posibles
export type EventPayload =
  | NavigationPayload
  | ErrorPayload
  | SuccessPayload
  | UserActionPayload
  | NotificationPayload
  | ThemePayload
  | ModalStatePayload;

// Tipo para el manejador de eventos
export type EventHandler<T extends EventPayload = EventPayload> = (payload: T) => void;

// Interfaz para el EventBus
export interface IEventBus {
  emit<T extends EventPayload>(type: EventType, payload: T): void;
  on<T extends EventPayload>(type: EventType, handler: EventHandler<T>): () => void;
  off<T extends EventPayload>(type: EventType, handler: EventHandler<T>): void;
} 