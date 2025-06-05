import { createRouter, createWebHistory } from "vue-router";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import eventBus, { EventTypes } from "remote/eventBus";

// Configuración de NProgress
NProgress.configure({ 
  showSpinner: false,
  minimum: 0.3
});

const routes = [
  {
    path: "/",
    name: "home",
    component: () => {
      NProgress.start();
      return import("remote/Home")
        .then(component => {
          NProgress.done();
          return component;
        })
        .catch(error => {
          NProgress.done();
          eventBus.emit(EventTypes.ERROR, {
            message: "Error al cargar el componente Home",
            error
          });
          throw error;
        });
    },
    meta: {
      title: "Inicio"
    }
  },
  {
    path: "/admin",
    name: "admin",
    component: () => {
      NProgress.start();
      return import("remote/Admin")
        .then(component => {
          NProgress.done();
          return component;
        })
        .catch(error => {
          NProgress.done();
          eventBus.emit(EventTypes.ERROR, {
            message: "Error al cargar el componente Admin",
            error
          });
          throw error;
        });
    },
    meta: {
      title: "Administración"
    }
  },
  {
    path: "/about",
    name: "about",
    component: () => {
      NProgress.start();
      return import("remote/About")
        .then(component => {
          NProgress.done();
          return component;
        })
        .catch(error => {
          NProgress.done();
          eventBus.emit(EventTypes.ERROR, {
            message: "Error al cargar el componente About",
            error
          });
          throw error;
        });
    },
    meta: {
      title: "Acerca de"
    }
  },
  {
    path: "/noticias",
    component: () => import("noticias/Noticias"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Manejar eventos de navegación
router.beforeEach((to, from, next) => {
  // Emitir evento de navegación
  eventBus.emit(EventTypes.NAVIGATION, {
    from: from.path,
    to: to.path,
    timestamp: new Date().toISOString()
  });

  // Actualizar título
  document.title = to.meta.title ? `${to.meta.title} - Host Application` : 'Host Application';
  
  next();
});

export default router;
