import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = computed(() => !!user.value)
  const error = ref('')

  // Credenciales de prueba
  const USERS = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'usuario', password: 'usuario123', role: 'user' }
  ]

  function login(username, password) {
    // Limpiar error previo
    error.value = ''
    
    // Buscar usuario con las credenciales proporcionadas
    const foundUser = USERS.find(
      u => u.username === username && u.password === password
    )

    if (foundUser) {
      // Guardar información del usuario (sin la contraseña)
      user.value = {
        username: foundUser.username,
        role: foundUser.role
      }
      
      // Guardar en localStorage para persistencia
      localStorage.setItem('user', JSON.stringify(user.value))
      
      return true
    } else {
      error.value = 'Credenciales incorrectas'
      return false
    }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('user')
    // No usamos router.push aquí, lo haremos desde el componente
  }

  function checkAuth() {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
    }
  }

  return {
    user,
    isAuthenticated,
    error,
    login,
    logout,
    checkAuth
  }
})