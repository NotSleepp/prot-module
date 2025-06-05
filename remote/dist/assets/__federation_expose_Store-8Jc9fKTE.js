import { importShared } from './__federation_fn_import-BwnnmZbt.js';

const {defineStore} = await importShared('pinia');


const useSharedStore = defineStore('shared', {
  state: () => ({
    currentUser: null,
    theme: 'light',
    notifications: [],
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.currentUser,
    userRole: (state) => state.currentUser?.role,
    unreadNotifications: (state) => state.notifications.filter(n => !n.read).length,
  },
  
  actions: {
    setUser(user) {
      this.currentUser = user;
    },
    
    logout() {
      this.currentUser = null;
    },
    
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
    },
    
    addNotification(notification) {
      this.notifications.push({
        ...notification,
        id: Date.now(),
        read: false,
        timestamp: new Date().toISOString()
      });
    },
    
    markNotificationAsRead(notificationId) {
      const notification = this.notifications.find(n => n.id === notificationId);
      if (notification) {
        notification.read = true;
      }
    }
  }
});

export { useSharedStore };
