import { importShared } from './_virtual___federation_fn_import-BtT-TC3s.js';

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

const remotesMap = {
'remote':{url:'https://autogestion2.atlantida.edu.ar/frontend/remote/assets/remoteEntry.js',format:'esm',from:'vite'},
  'noticias':{url:'https://autogestion2.atlantida.edu.ar/frontend/noticias/assets/remoteEntry.js',format:'esm',from:'vite'}
};
                const currentImports = {};
                const loadJS = async (url, fn) => {
                    const resolvedUrl = typeof url === 'function' ? await url() : url;
                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.onload = fn;
                    script.src = resolvedUrl;
                    document.getElementsByTagName('head')[0].appendChild(script);
                };

                function get(name, remoteFrom) {
                    return __federation_import(name).then(module => () => {
                        if (remoteFrom === 'webpack') {
                            return Object.prototype.toString.call(module).indexOf('Module') > -1 && module.default ? module.default : module
                        }
                        return module
                    })
                }
                
                function merge(obj1, obj2) {
                  const mergedObj = Object.assign(obj1, obj2);
                  for (const key of Object.keys(mergedObj)) {
                    if (typeof mergedObj[key] === 'object' && typeof obj2[key] === 'object') {
                      mergedObj[key] = merge(mergedObj[key], obj2[key]);
                    }
                  }
                  return mergedObj;
                }

                const wrapShareModule = remoteFrom => {
                  return merge({
                    'vue':{'3.5.16':{get:()=>get(new URL('__federation_shared_vue-DfDSfpvY.js', import.meta.url).href, remoteFrom), loaded:1}},'vue-router':{'4.5.1':{get:()=>get(new URL('__federation_shared_vue-router-BvU9WogW.js', import.meta.url).href, remoteFrom), loaded:1}},'pinia':{'3.0.3':{get:()=>get(new URL('__federation_shared_pinia-BgYYI71o.js', import.meta.url).href, remoteFrom), loaded:1}}
                  }, (globalThis.__federation_shared__ || {})['default'] || {});
                };

                async function __federation_import(name) {
                    currentImports[name] ??= import(name);
                    return currentImports[name]
                }

                async function __federation_method_ensure(remoteId) {
                    const remote = remotesMap[remoteId];
                    if (!remote.inited) {
                        if ('var' === remote.format) {
                            // loading js with script tag
                            return new Promise(resolve => {
                                const callback = () => {
                                    if (!remote.inited) {
                                        remote.lib = window[remoteId];
                                        remote.lib.init(wrapShareModule(remote.from));
                                        remote.inited = true;
                                    }
                                    resolve(remote.lib);
                                };
                                return loadJS(remote.url, callback);
                            });
                        } else if (['esm', 'systemjs'].includes(remote.format)) {
                            // loading js with import(...)
                            return new Promise((resolve, reject) => {
                                const getUrl = typeof remote.url === 'function' ? remote.url : () => Promise.resolve(remote.url);
                                getUrl().then(url => {
                                    import(/* @vite-ignore */ url).then(lib => {
                                        if (!remote.inited) {
                                            const shareScope = wrapShareModule(remote.from);
                                            lib.init(shareScope);
                                            remote.lib = lib;
                                            remote.lib.init(shareScope);
                                            remote.inited = true;
                                        }
                                        resolve(remote.lib);
                                    }).catch(reject);
                                });
                            })
                        }
                    } else {
                        return remote.lib;
                    }
                }

                function __federation_method_unwrapDefault(module) {
                    return (module?.__esModule || module?.[Symbol.toStringTag] === 'Module') ? module.default : module
                }

                function __federation_method_wrapDefault(module, need) {
                    if (!module?.default && need) {
                        let obj = Object.create(null);
                        obj.default = module;
                        obj.__esModule = true;
                        return obj;
                    }
                    return module;
                }

                function __federation_method_getRemote(remoteName, componentName) {
                    return __federation_method_ensure(remoteName).then((remote) => remote.get(componentName).then(factory => factory()));
                }

const {defineStore} = await importShared('pinia');


const useThemeStore = defineStore('theme', {
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

const {unref:_unref$2,createElementVNode:_createElementVNode$2,openBlock:_openBlock$2,createElementBlock:_createElementBlock$2,createCommentVNode:_createCommentVNode$1} = await importShared('vue');


const _hoisted_1$2 = ["title"];
const _hoisted_2$2 = {
  key: 0,
  class: "w-6 h-6 text-yellow-500",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
const _hoisted_3$2 = {
  key: 1,
  class: "w-6 h-6 text-gray-700",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};


const _sfc_main$2 = {
  __name: 'ThemeToggle',
  setup(__props) {

const themeStore = useThemeStore();

const toggleTheme = () => {
  themeStore.toggleTheme();
};

return (_ctx, _cache) => {
  return (_openBlock$2(), _createElementBlock$2("button", {
    onClick: toggleTheme,
    class: "fixed top-4 right-4 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900 z-50",
    title: _unref$2(themeStore).isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
  }, [
    (_unref$2(themeStore).isDark)
      ? (_openBlock$2(), _createElementBlock$2("svg", _hoisted_2$2, _cache[0] || (_cache[0] = [
          _createElementVNode$2("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          }, null, -1)
        ])))
      : (_openBlock$2(), _createElementBlock$2("svg", _hoisted_3$2, _cache[1] || (_cache[1] = [
          _createElementVNode$2("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          }, null, -1)
        ])))
  ], 8, _hoisted_1$2))
}
}

};

const logo = "data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='32'%20height='32'%20rx='8'%20fill='%234F46E5'/%3e%3cpath%20d='M16%208L24%2024H8L16%208Z'%20fill='white'/%3e%3c/svg%3e";

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const {openBlock:_openBlock$1,createElementBlock:_createElementBlock$1,createCommentVNode:_createCommentVNode,createElementVNode:_createElementVNode$1,unref:_unref$1,normalizeClass:_normalizeClass,renderList:_renderList,Fragment:_Fragment,toDisplayString:_toDisplayString,resolveComponent:_resolveComponent$1,withCtx:_withCtx,createVNode:_createVNode$1,Transition:_Transition,createStaticVNode:_createStaticVNode} = await importShared('vue');


const _hoisted_1$1 = { class: "lg:hidden fixed top-4 left-4 z-50" };
const _hoisted_2$1 = ["aria-label"];
const _hoisted_3$1 = {
  class: "w-6 h-6",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
const _hoisted_4$1 = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M4 6h16M4 12h16M4 18h16"
};
const _hoisted_5 = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M6 18L18 6M6 6l12 12"
};
const _hoisted_6 = { class: "flex flex-col h-full" };
const _hoisted_7 = ["src"];
const _hoisted_8 = {
  key: 0,
  class: "text-xl font-bold text-white truncate transition-opacity duration-200"
};
const _hoisted_9 = { class: "flex-1 px-2 py-4 space-y-1 overflow-y-auto" };
const _hoisted_10 = { class: "flex items-center min-w-[2rem] h-6" };
const _hoisted_11 = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
};
const _hoisted_12 = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
};
const _hoisted_13 = {
  key: 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
};
const _hoisted_14 = {
  key: 3,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14"
};
const _hoisted_15 = {
  key: 0,
  class: "ml-3 truncate transition-opacity duration-200"
};
const _hoisted_16 = { class: "p-4 border-t border-gray-200 dark:border-gray-700" };
const _hoisted_17 = {
  key: 0,
  class: "flex-1 min-w-0"
};

const {ref,computed,onMounted: onMounted$1,onUnmounted,watch} = await importShared('vue');

const {useRoute} = await importShared('vue-router');


const _sfc_main$1 = {
  __name: 'Sidebar',
  emits: ['collapse'],
  setup(__props, { emit: __emit }) {

useRoute();
const isOpen = ref(false);
const isCollapsed = ref(false);
const isLargeScreen = ref(false);

const emit = __emit;

// Rutas con sus iconos
const routes = [
  {
    path: '/',
    name: 'Inicio'
  },
  {
    path: '/admin',
    name: 'Admin'
  },
  {
    path: '/about',
    name: 'Acerca de'
  },
  {
    path: '/noticias',
    name: 'Noticias'
  }
];

// Métodos
const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
  if (!isOpen.value) {
    isCollapsed.value = false;
  }
};

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  emit('collapse', isCollapsed.value);
};

// Detectar tamaño de pantalla
const checkScreenSize = () => {
  isLargeScreen.value = window.innerWidth >= 1024;
  if (!isLargeScreen.value) {
    isCollapsed.value = false;
    emit('collapse', false);
  }
};

// Lifecycle hooks
onMounted$1(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});

// Watch para emitir el estado inicial
watch(isCollapsed, (value) => {
  emit('collapse', value);
}, { immediate: true });

return (_ctx, _cache) => {
  const _component_router_link = _resolveComponent$1("router-link");

  return (_openBlock$1(), _createElementBlock$1("div", null, [
    _createElementVNode$1("div", _hoisted_1$1, [
      _createElementVNode$1("button", {
        onClick: toggleSidebar,
        class: "p-2 rounded-md bg-white shadow-lg text-gray-600 hover:text-gray-900 transition-colors duration-200",
        "aria-label": isOpen.value ? 'Cerrar menú' : 'Abrir menú'
      }, [
        (_openBlock$1(), _createElementBlock$1("svg", _hoisted_3$1, [
          (!isOpen.value)
            ? (_openBlock$1(), _createElementBlock$1("path", _hoisted_4$1))
            : (_openBlock$1(), _createElementBlock$1("path", _hoisted_5))
        ]))
      ], 8, _hoisted_2$1)
    ]),
    (isOpen.value)
      ? (_openBlock$1(), _createElementBlock$1("div", {
          key: 0,
          class: "fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30",
          onClick: toggleSidebar
        }))
      : _createCommentVNode("", true),
    _createElementVNode$1("aside", {
      class: _normalizeClass([
        'fixed inset-y-0 left-0 z-40 bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 ease-in-out transform',
        isOpen.value ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        isCollapsed.value ? 'w-20' : 'w-64',
        'lg:fixed'
      ])
    }, [
      _createElementVNode$1("div", _hoisted_6, [
        _createElementVNode$1("div", {
          class: _normalizeClass([
            'flex items-center h-16 transition-all duration-300',
            isCollapsed.value ? 'justify-center px-2' : 'px-4 justify-between',
            'bg-gradient-to-r from-indigo-600 to-indigo-800 relative overflow-hidden dark:from-indigo-800 dark:to-indigo-950'
          ])
        }, [
          _createElementVNode$1("div", {
            class: _normalizeClass(["flex items-center transition-all duration-300 relative z-10", [isCollapsed.value ? 'justify-center w-full' : 'space-x-3']])
          }, [
            _createElementVNode$1("div", {
              class: _normalizeClass(["flex-shrink-0 transition-all duration-300 relative", [isCollapsed.value ? 'w-10 h-10' : 'w-8 h-8']])
            }, [
              _createElementVNode$1("img", {
                src: _unref$1(logo),
                alt: "Logo",
                class: "w-full h-full object-contain transition-all duration-300"
              }, null, 8, _hoisted_7)
            ], 2),
            (!isCollapsed.value)
              ? (_openBlock$1(), _createElementBlock$1("h1", _hoisted_8, " Universidad Atlantida "))
              : _createCommentVNode("", true)
          ], 2),
          _createElementVNode$1("button", {
            onClick: toggleCollapse,
            class: "hidden lg:flex p-1.5 rounded-lg text-indigo-100 hover:text-white hover:bg-indigo-700/50 transition-colors duration-200 relative z-10"
          }, [
            (_openBlock$1(), _createElementBlock$1("svg", {
              class: _normalizeClass(["w-5 h-5 transform transition-transform duration-200", { 'rotate-180': isCollapsed.value }]),
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24"
            }, _cache[0] || (_cache[0] = [
              _createElementVNode$1("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M15 19l-7-7 7-7"
              }, null, -1)
            ]), 2))
          ]),
          _createElementVNode$1("div", {
            class: _normalizeClass(["absolute inset-0 z-0 opacity-10", { 'scale-150': isCollapsed.value }])
          }, _cache[1] || (_cache[1] = [
            _createElementVNode$1("div", { class: "absolute -inset-4 bg-gradient-to-r from-white/20 to-transparent rounded-full blur-2xl transform rotate-45" }, null, -1),
            _createElementVNode$1("div", { class: "absolute -inset-4 bg-gradient-to-l from-white/20 to-transparent rounded-full blur-2xl transform -rotate-45" }, null, -1)
          ]), 2)
        ], 2),
        _createElementVNode$1("nav", _hoisted_9, [
          (_openBlock$1(), _createElementBlock$1(_Fragment, null, _renderList(routes, (route) => {
            return _createVNode$1(_component_router_link, {
              key: route.path,
              to: route.path,
              class: _normalizeClass([
              _ctx.$route.path === route.path
                ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-200 border-indigo-500'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100 border-transparent',
              'group flex items-center text-sm font-medium rounded-lg transition-all duration-200 border-l-4 h-12',
              'relative px-3'
            ]),
              title: isCollapsed.value ? route.name : ''
            }, {
              default: _withCtx(() => [
                _createElementVNode$1("div", _hoisted_10, [
                  (_openBlock$1(), _createElementBlock$1("svg", {
                    class: _normalizeClass(["w-6 h-6", [
                  _ctx.$route.path === route.path ? 'text-indigo-500 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400',
                  'transition-colors duration-200'
                ]]),
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    (route.path === '/')
                      ? (_openBlock$1(), _createElementBlock$1("path", _hoisted_11))
                      : (route.path === '/admin')
                        ? (_openBlock$1(), _createElementBlock$1("path", _hoisted_12))
                        : (route.path === '/about')
                          ? (_openBlock$1(), _createElementBlock$1("path", _hoisted_13))
                          : (route.path === '/noticias')
                            ? (_openBlock$1(), _createElementBlock$1("path", _hoisted_14))
                            : _createCommentVNode("", true)
                  ], 2))
                ]),
                (!isCollapsed.value)
                  ? (_openBlock$1(), _createElementBlock$1("span", _hoisted_15, _toDisplayString(route.name), 1))
                  : _createCommentVNode("", true)
              ]),
              _: 2
            }, 1032, ["to", "class", "title"])
          }), 64))
        ]),
        _createElementVNode$1("div", _hoisted_16, [
          _createElementVNode$1("div", {
            class: _normalizeClass([
              'flex items-center',
              isCollapsed.value ? 'justify-center' : 'space-x-3'
            ])
          }, [
            _cache[3] || (_cache[3] = _createStaticVNode("<div class=\"flex-shrink-0\" data-v-378bb7e6><div class=\"relative\" data-v-378bb7e6><div class=\"w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center\" data-v-378bb7e6><span class=\"text-white font-medium text-sm\" data-v-378bb7e6>US</span></div><div class=\"absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-800\" data-v-378bb7e6></div></div></div>", 1)),
            _createVNode$1(_Transition, { name: "fade" }, {
              default: _withCtx(() => [
                (!isCollapsed.value)
                  ? (_openBlock$1(), _createElementBlock$1("div", _hoisted_17, _cache[2] || (_cache[2] = [
                      _createElementVNode$1("p", { class: "text-sm font-medium text-gray-900 dark:text-white truncate" }, "Usuario", -1),
                      _createElementVNode$1("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, "En línea", -1)
                    ])))
                  : _createCommentVNode("", true)
              ]),
              _: 1
            })
          ], 2)
        ])
      ])
    ], 2)
  ]))
}
}

};
const Sidebar = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-378bb7e6"]]);

const {createVNode:_createVNode,createElementVNode:_createElementVNode,resolveComponent:_resolveComponent,unref:_unref,openBlock:_openBlock,createElementBlock:_createElementBlock} = await importShared('vue');


const _hoisted_1 = { class: "min-h-screen bg-gray-100 dark:bg-gray-900" };
const _hoisted_2 = { class: "lg:ml-64 transition-all duration-300" };
const _hoisted_3 = { class: "p-4 flex justify-end" };
const _hoisted_4 = { class: "p-4" };
const {onMounted} = await importShared('vue');

const __federation_var_remoteNotificationListener = await __federation_method_getRemote("remote" , "./NotificationListener");
 let NotificationListener = __federation_method_unwrapDefault(__federation_var_remoteNotificationListener); 


const _sfc_main = {
  __name: 'App',
  setup(__props) {

const themeStore = useThemeStore();

onMounted(() => {
  themeStore.initTheme();
});

return (_ctx, _cache) => {
  const _component_router_view = _resolveComponent("router-view");

  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createVNode(Sidebar),
    _createElementVNode("div", _hoisted_2, [
      _createElementVNode("div", _hoisted_3, [
        _createVNode(_sfc_main$2)
      ]),
      _createElementVNode("main", _hoisted_4, [
        _createVNode(_component_router_view)
      ])
    ]),
    _createVNode(_unref(NotificationListener))
  ]))
}
}

};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var nprogress$1 = {exports: {}};

/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
var nprogress = nprogress$1.exports;

var hasRequiredNprogress;

function requireNprogress () {
	if (hasRequiredNprogress) return nprogress$1.exports;
	hasRequiredNprogress = 1;
	(function (module, exports) {
(function(root, factory) {

		  {
		    module.exports = factory();
		  }

		})(nprogress, function() {
		  var NProgress = {};

		  NProgress.version = '0.2.0';

		  var Settings = NProgress.settings = {
		    minimum: 0.08,
		    easing: 'ease',
		    positionUsing: '',
		    speed: 200,
		    trickle: true,
		    trickleRate: 0.02,
		    trickleSpeed: 800,
		    showSpinner: true,
		    barSelector: '[role="bar"]',
		    spinnerSelector: '[role="spinner"]',
		    parent: 'body',
		    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
		  };

		  /**
		   * Updates configuration.
		   *
		   *     NProgress.configure({
		   *       minimum: 0.1
		   *     });
		   */
		  NProgress.configure = function(options) {
		    var key, value;
		    for (key in options) {
		      value = options[key];
		      if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
		    }

		    return this;
		  };

		  /**
		   * Last number.
		   */

		  NProgress.status = null;

		  /**
		   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
		   *
		   *     NProgress.set(0.4);
		   *     NProgress.set(1.0);
		   */

		  NProgress.set = function(n) {
		    var started = NProgress.isStarted();

		    n = clamp(n, Settings.minimum, 1);
		    NProgress.status = (n === 1 ? null : n);

		    var progress = NProgress.render(!started),
		        bar      = progress.querySelector(Settings.barSelector),
		        speed    = Settings.speed,
		        ease     = Settings.easing;

		    progress.offsetWidth; /* Repaint */

		    queue(function(next) {
		      // Set positionUsing if it hasn't already been set
		      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();

		      // Add transition
		      css(bar, barPositionCSS(n, speed, ease));

		      if (n === 1) {
		        // Fade out
		        css(progress, { 
		          transition: 'none', 
		          opacity: 1 
		        });
		        progress.offsetWidth; /* Repaint */

		        setTimeout(function() {
		          css(progress, { 
		            transition: 'all ' + speed + 'ms linear', 
		            opacity: 0 
		          });
		          setTimeout(function() {
		            NProgress.remove();
		            next();
		          }, speed);
		        }, speed);
		      } else {
		        setTimeout(next, speed);
		      }
		    });

		    return this;
		  };

		  NProgress.isStarted = function() {
		    return typeof NProgress.status === 'number';
		  };

		  /**
		   * Shows the progress bar.
		   * This is the same as setting the status to 0%, except that it doesn't go backwards.
		   *
		   *     NProgress.start();
		   *
		   */
		  NProgress.start = function() {
		    if (!NProgress.status) NProgress.set(0);

		    var work = function() {
		      setTimeout(function() {
		        if (!NProgress.status) return;
		        NProgress.trickle();
		        work();
		      }, Settings.trickleSpeed);
		    };

		    if (Settings.trickle) work();

		    return this;
		  };

		  /**
		   * Hides the progress bar.
		   * This is the *sort of* the same as setting the status to 100%, with the
		   * difference being `done()` makes some placebo effect of some realistic motion.
		   *
		   *     NProgress.done();
		   *
		   * If `true` is passed, it will show the progress bar even if its hidden.
		   *
		   *     NProgress.done(true);
		   */

		  NProgress.done = function(force) {
		    if (!force && !NProgress.status) return this;

		    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
		  };

		  /**
		   * Increments by a random amount.
		   */

		  NProgress.inc = function(amount) {
		    var n = NProgress.status;

		    if (!n) {
		      return NProgress.start();
		    } else {
		      if (typeof amount !== 'number') {
		        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
		      }

		      n = clamp(n + amount, 0, 0.994);
		      return NProgress.set(n);
		    }
		  };

		  NProgress.trickle = function() {
		    return NProgress.inc(Math.random() * Settings.trickleRate);
		  };

		  /**
		   * Waits for all supplied jQuery promises and
		   * increases the progress as the promises resolve.
		   *
		   * @param $promise jQUery Promise
		   */
		  (function() {
		    var initial = 0, current = 0;

		    NProgress.promise = function($promise) {
		      if (!$promise || $promise.state() === "resolved") {
		        return this;
		      }

		      if (current === 0) {
		        NProgress.start();
		      }

		      initial++;
		      current++;

		      $promise.always(function() {
		        current--;
		        if (current === 0) {
		            initial = 0;
		            NProgress.done();
		        } else {
		            NProgress.set((initial - current) / initial);
		        }
		      });

		      return this;
		    };

		  })();

		  /**
		   * (Internal) renders the progress bar markup based on the `template`
		   * setting.
		   */

		  NProgress.render = function(fromStart) {
		    if (NProgress.isRendered()) return document.getElementById('nprogress');

		    addClass(document.documentElement, 'nprogress-busy');
		    
		    var progress = document.createElement('div');
		    progress.id = 'nprogress';
		    progress.innerHTML = Settings.template;

		    var bar      = progress.querySelector(Settings.barSelector),
		        perc     = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
		        parent   = document.querySelector(Settings.parent),
		        spinner;
		    
		    css(bar, {
		      transition: 'all 0 linear',
		      transform: 'translate3d(' + perc + '%,0,0)'
		    });

		    if (!Settings.showSpinner) {
		      spinner = progress.querySelector(Settings.spinnerSelector);
		      spinner && removeElement(spinner);
		    }

		    if (parent != document.body) {
		      addClass(parent, 'nprogress-custom-parent');
		    }

		    parent.appendChild(progress);
		    return progress;
		  };

		  /**
		   * Removes the element. Opposite of render().
		   */

		  NProgress.remove = function() {
		    removeClass(document.documentElement, 'nprogress-busy');
		    removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent');
		    var progress = document.getElementById('nprogress');
		    progress && removeElement(progress);
		  };

		  /**
		   * Checks if the progress bar is rendered.
		   */

		  NProgress.isRendered = function() {
		    return !!document.getElementById('nprogress');
		  };

		  /**
		   * Determine which positioning CSS rule to use.
		   */

		  NProgress.getPositioningCSS = function() {
		    // Sniff on document.body.style
		    var bodyStyle = document.body.style;

		    // Sniff prefixes
		    var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
		                       ('MozTransform' in bodyStyle) ? 'Moz' :
		                       ('msTransform' in bodyStyle) ? 'ms' :
		                       ('OTransform' in bodyStyle) ? 'O' : '';

		    if (vendorPrefix + 'Perspective' in bodyStyle) {
		      // Modern browsers with 3D support, e.g. Webkit, IE10
		      return 'translate3d';
		    } else if (vendorPrefix + 'Transform' in bodyStyle) {
		      // Browsers without 3D support, e.g. IE9
		      return 'translate';
		    } else {
		      // Browsers without translate() support, e.g. IE7-8
		      return 'margin';
		    }
		  };

		  /**
		   * Helpers
		   */

		  function clamp(n, min, max) {
		    if (n < min) return min;
		    if (n > max) return max;
		    return n;
		  }

		  /**
		   * (Internal) converts a percentage (`0..1`) to a bar translateX
		   * percentage (`-100%..0%`).
		   */

		  function toBarPerc(n) {
		    return (-1 + n) * 100;
		  }


		  /**
		   * (Internal) returns the correct CSS for changing the bar's
		   * position given an n percentage, and speed and ease from Settings
		   */

		  function barPositionCSS(n, speed, ease) {
		    var barCSS;

		    if (Settings.positionUsing === 'translate3d') {
		      barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' };
		    } else if (Settings.positionUsing === 'translate') {
		      barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' };
		    } else {
		      barCSS = { 'margin-left': toBarPerc(n)+'%' };
		    }

		    barCSS.transition = 'all '+speed+'ms '+ease;

		    return barCSS;
		  }

		  /**
		   * (Internal) Queues a function to be executed.
		   */

		  var queue = (function() {
		    var pending = [];
		    
		    function next() {
		      var fn = pending.shift();
		      if (fn) {
		        fn(next);
		      }
		    }

		    return function(fn) {
		      pending.push(fn);
		      if (pending.length == 1) next();
		    };
		  })();

		  /**
		   * (Internal) Applies css properties to an element, similar to the jQuery 
		   * css method.
		   *
		   * While this helper does assist with vendor prefixed property names, it 
		   * does not perform any manipulation of values prior to setting styles.
		   */

		  var css = (function() {
		    var cssPrefixes = [ 'Webkit', 'O', 'Moz', 'ms' ],
		        cssProps    = {};

		    function camelCase(string) {
		      return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {
		        return letter.toUpperCase();
		      });
		    }

		    function getVendorProp(name) {
		      var style = document.body.style;
		      if (name in style) return name;

		      var i = cssPrefixes.length,
		          capName = name.charAt(0).toUpperCase() + name.slice(1),
		          vendorName;
		      while (i--) {
		        vendorName = cssPrefixes[i] + capName;
		        if (vendorName in style) return vendorName;
		      }

		      return name;
		    }

		    function getStyleProp(name) {
		      name = camelCase(name);
		      return cssProps[name] || (cssProps[name] = getVendorProp(name));
		    }

		    function applyCss(element, prop, value) {
		      prop = getStyleProp(prop);
		      element.style[prop] = value;
		    }

		    return function(element, properties) {
		      var args = arguments,
		          prop, 
		          value;

		      if (args.length == 2) {
		        for (prop in properties) {
		          value = properties[prop];
		          if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
		        }
		      } else {
		        applyCss(element, args[1], args[2]);
		      }
		    }
		  })();

		  /**
		   * (Internal) Determines if an element or space separated list of class names contains a class name.
		   */

		  function hasClass(element, name) {
		    var list = typeof element == 'string' ? element : classList(element);
		    return list.indexOf(' ' + name + ' ') >= 0;
		  }

		  /**
		   * (Internal) Adds a class to an element.
		   */

		  function addClass(element, name) {
		    var oldList = classList(element),
		        newList = oldList + name;

		    if (hasClass(oldList, name)) return; 

		    // Trim the opening space.
		    element.className = newList.substring(1);
		  }

		  /**
		   * (Internal) Removes a class from an element.
		   */

		  function removeClass(element, name) {
		    var oldList = classList(element),
		        newList;

		    if (!hasClass(element, name)) return;

		    // Replace the class name.
		    newList = oldList.replace(' ' + name + ' ', ' ');

		    // Trim the opening and closing spaces.
		    element.className = newList.substring(1, newList.length - 1);
		  }

		  /**
		   * (Internal) Gets a space separated list of the class names on the element. 
		   * The list is wrapped with a single space on each end to facilitate finding 
		   * matches within the list.
		   */

		  function classList(element) {
		    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ');
		  }

		  /**
		   * (Internal) Removes an element from the DOM.
		   */

		  function removeElement(element) {
		    element && element.parentNode && element.parentNode.removeChild(element);
		  }

		  return NProgress;
		}); 
	} (nprogress$1));
	return nprogress$1.exports;
}

var nprogressExports = requireNprogress();
const NProgress = /*@__PURE__*/getDefaultExportFromCjs(nprogressExports);

const {createRouter,createWebHistory} = await importShared('vue-router');
const __federation_var_remoteeventBus = await __federation_method_getRemote("remote" , "./eventBus");
 let eventBus = __federation_method_unwrapDefault(__federation_var_remoteeventBus); 
 let {EventTypes} = __federation_var_remoteeventBus;

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
      return __federation_method_getRemote("remote" , "./Home").then(module=>__federation_method_wrapDefault(module, true))
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
      return __federation_method_getRemote("remote" , "./Admin").then(module=>__federation_method_wrapDefault(module, true))
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
      return __federation_method_getRemote("remote" , "./About").then(module=>__federation_method_wrapDefault(module, true))
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
    component: () => __federation_method_getRemote("noticias" , "./Noticias").then(module=>__federation_method_wrapDefault(module, true)),
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

const {createApp} = await importShared('vue');

const {createPinia} = await importShared('pinia');

const app = createApp(_sfc_main);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount("#app");
