import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import About from "../views/About.vue";

const routes = [
  {
    path: "/frontend/remote/",
    name: "home",
    component: Home,
    meta: {
      title: "Inicio"
    }
  },
  {
    path: "/frontend/remote/admin",
    name: "admin",
    component: Admin,
    meta: {
      title: "Administración"
    }
  },
  {
    path: "/frontend/remote/about",
    name: "about",
    component: About,
    meta: {
      title: "Acerca de"
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Sincronizar el título de la página con la ruta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - Host Application` : 'Host Application';
  next();
});

export default router;
