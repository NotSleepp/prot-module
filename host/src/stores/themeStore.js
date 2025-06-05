import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: localStorage.getItem('theme') === 'dark' || 
            (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  }),

  getters: {
    currentTheme: (state) => state.isDark ? 'dark' : 'light'
  },

  actions: {
    toggleTheme() {
      this.isDark = !this.isDark;
      this.applyTheme();
    },

    initTheme() {
      // Aplicar tema inicial
      this.applyTheme();
      
      // Escuchar cambios en las preferencias del sistema
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          this.isDark = e.matches;
          this.applyTheme();
        }
      });
    },

    applyTheme() {
      // Aplicar clase al elemento html
      const root = document.documentElement;
      if (this.isDark) {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }
}); 