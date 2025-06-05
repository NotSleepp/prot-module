import { importShared } from './__federation_fn_import-BwnnmZbt.js';
import NotificationListener from './__federation_expose_NotificationListener-BD819lUu.js';
import { _export_sfc } from './_plugin-vue_export-helper-8ijppmbV.js';
import Home from './__federation_expose_Home-8UMgKRdM.js';
import Admin from './__federation_expose_Admin-DZ_eLJRJ.js';
import About from './__federation_expose_About-TwywYzi1.js';

true              &&(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
}());

const _sfc_main = {
  name: 'App',
  components: {
    NotificationListener
  }
};

const {resolveDynamicComponent:_resolveDynamicComponent,openBlock:_openBlock,createBlock:_createBlock,Transition:_Transition,withCtx:_withCtx,createVNode:_createVNode,resolveComponent:_resolveComponent,createElementBlock:_createElementBlock} = await importShared('vue');


const _hoisted_1 = { class: "min-h-screen" };

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_view = _resolveComponent("router-view");
  const _component_NotificationListener = _resolveComponent("NotificationListener");

  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createVNode(_component_router_view, null, {
      default: _withCtx(({ Component }) => [
        _createVNode(_Transition, {
          name: "fade",
          mode: "out-in",
          "enter-active-class": "transition ease-out duration-200",
          "enter-from-class": "opacity-0 transform scale-95",
          "enter-to-class": "opacity-100 transform scale-100",
          "leave-active-class": "transition ease-in duration-150",
          "leave-from-class": "opacity-100 transform scale-100",
          "leave-to-class": "opacity-0 transform scale-95"
        }, {
          default: _withCtx(() => [
            (_openBlock(), _createBlock(_resolveDynamicComponent(Component)))
          ]),
          _: 2
        }, 1024)
      ]),
      _: 1
    }),
    _createVNode(_component_NotificationListener)
  ]))
}
const App = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

const {createRouter,createWebHistory} = await importShared('vue-router');

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

const {createApp} = await importShared('vue');

const {createPinia} = await importShared('pinia');

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount("#app");
