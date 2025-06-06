import { createRouter, createWebHistory } from "vue-router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import eventBus, { EventTypes } from "remote/eventBus"
import { useAuthStore } from "../stores/authStore"

// Configuración de NProgress
NProgress.configure({
  showSpinner: false,
  minimum: 0.3,
})

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "Iniciar Sesión",
      public: true
    }
  },
  {
    path: "/",
    name: "home",
    component: () => {
      NProgress.start()
      return import("remote/Home")
        .then((component) => {
          NProgress.done()
          return component
        })
        .catch((error) => {
          NProgress.done()
          eventBus.emit(EventTypes.ERROR, {
            message: "Error al cargar el componente Home",
            error,
          })
          throw error
        })
    },
    meta: {
      title: "Inicio",
    },
  },
  {
    path: "/admin",
    name: "admin",
    component: () => {
      NProgress.start()
      return import("remote/Admin")
        .then((component) => {
          NProgress.done()
          return component
        })
        .catch((error) => {
          NProgress.done()
          eventBus.emit(EventTypes.ERROR, {
            message: "Error al cargar el componente Admin",
            error,
          })
          throw error
        })
    },
    meta: {
      title: "Administración",
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => {
      NProgress.start()
      return import("remote/About")
        .then((component) => {
          NProgress.done()
          return component
        })
        .catch((error) => {
          NProgress.done()
          eventBus.emit(EventTypes.ERROR, {
            message: "Error al cargar el componente About",
            error,
          })
          throw error
        })
    },
    meta: {
      title: "Acerca de",
    },
  },
  {
    path: "/noticias",
    name: "noticias",
    component: () => import("noticias/Noticias"),
    meta: {
      title: "Noticias",
    },
  },
  // Rutas adicionales para los submenús
  {
    path: "/estudiantes",
    name: "estudiantes",
    component: () => import("remote/Estudiantes"),
    meta: {
      title: "Estudiantes",
    },
  },
  {
    path: "/inscripciones",
    name: "inscripciones",
    component: () => import("remote/Inscripciones"),
    meta: {
      title: "Inscripciones",
    },
  },
  {
    path: "/asistencia",
    name: "asistencia",
    component: () => import("remote/Asistencia"),
    meta: {
      title: "Asistencia",
    },
  },
  {
    path: "/planes",
    name: "planes",
    component: () => import("remote/Planes"),
    meta: {
      title: "Planes de Estudio",
    },
  },
  {
    path: "/materias",
    name: "materias",
    component: () => import("remote/Materias"),
    meta: {
      title: "Materias",
    },
  },
  {
    path: "/calendario",
    name: "calendario",
    component: () => import("remote/Calendario"),
    meta: {
      title: "Calendario",
    },
  },
  {
    path: "/informes/rendimiento",
    name: "informes-rendimiento",
    component: () => import("remote/InformesRendimiento"),
    meta: {
      title: "Informes de Rendimiento",
    },
  },
  {
    path: "/informes/financiero",
    name: "informes-financiero",
    component: () => import("remote/InformesFinanciero"),
    meta: {
      title: "Informes Financieros",
    },
  },
  {
    path: "/documentacion",
    name: "documentacion",
    component: () => import("remote/Documentacion"),
    meta: {
      title: "Documentación",
    },
  },
  {
    path: "/biblioteca",
    name: "biblioteca",
    component: () => import("remote/Biblioteca"),
    meta: {
      title: "Biblioteca",
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// La ruta de login ya está añadida al inicio del array

// Manejar eventos de navegación y autenticación
router.beforeEach((to, from, next) => {
  // Inicializar el store de autenticación
  const authStore = useAuthStore()
  authStore.checkAuth()
  
  // Emitir evento de navegación
  eventBus.emit(EventTypes.NAVIGATION, {
    from: from.path,
    to: to.path,
    timestamp: new Date().toISOString(),
  })

  // Actualizar título
  document.title = to.meta.title ? `${to.meta.title} - Host Application` : "Host Application"

  // Verificar autenticación para rutas protegidas
  if (!to.meta.public && !authStore.isAuthenticated) {
    // Redirigir a login si no está autenticado y la ruta no es pública
    next({ name: 'login' })
  } else if (to.path === '/' && !authStore.isAuthenticated) {
    // Redirigir a login si está en la ruta raíz y no está autenticado
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
