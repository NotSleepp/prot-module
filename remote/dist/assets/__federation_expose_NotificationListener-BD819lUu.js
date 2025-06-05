import { importShared } from './__federation_fn_import-BwnnmZbt.js';
import eventBus, { EventTypes } from './__federation_expose_EventBus-CAM94XHk.js';
import { _export_sfc } from './_plugin-vue_export-helper-8ijppmbV.js';

const {ref,computed,onMounted,onUnmounted} = await importShared('vue');

const _sfc_main = {
  name: 'NotificationListener',
  setup() {
    const showNotification = ref(false);
    const progress = ref(100);
    const currentNotification = ref({
      type: 'info',
      title: '',
      message: ''
    });

    const getDefaultTitle = computed(() => {
      switch (currentNotification.value.type) {
        case 'error': return 'Error';
        case 'success': return 'Éxito';
        default: return 'Información';
      }
    });

    const progressBarClass = computed(() => ({
      'bg-red-400': currentNotification.value.type === 'error',
      'bg-green-400': currentNotification.value.type === 'success',
      'bg-blue-400': currentNotification.value.type === 'info'
    }));

    let progressInterval;

    const showNotificationWithTimeout = (notification) => {
      currentNotification.value = notification;
      showNotification.value = true;
      progress.value = 100;

      // Iniciar la barra de progreso
      if (progressInterval) clearInterval(progressInterval);
      const duration = 5000; // 5 segundos
      const updateInterval = 10; // Actualizar cada 10ms
      const step = (100 * updateInterval) / duration;

      progressInterval = setInterval(() => {
        progress.value = Math.max(0, progress.value - step);
        if (progress.value <= 0) {
          hideNotification();
        }
      }, updateInterval);
    };

    const hideNotification = () => {
      showNotification.value = false;
      if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
    };

    const handleError = (error) => {
      showNotificationWithTimeout({
        type: 'error',
        message: error.message
      });
    };

    const handleSuccess = (data) => {
      showNotificationWithTimeout({
        type: 'success',
        message: data.message
      });
    };

    const handleNavigation = (navigation) => {
      showNotificationWithTimeout({
        type: 'info',
        title: 'Navegación',
        message: `Navegando de ${navigation.from} a ${navigation.to}`
      });
    };

    onMounted(() => {
      eventBus.on(EventTypes.ERROR, handleError);
      eventBus.on(EventTypes.NAVIGATION, handleNavigation);
      eventBus.on(EventTypes.SUCCESS, handleSuccess);
    });

    onUnmounted(() => {
      eventBus.off(EventTypes.ERROR, handleError);
      eventBus.off(EventTypes.NAVIGATION, handleNavigation);
      eventBus.off(EventTypes.SUCCESS, handleSuccess);
      if (progressInterval) clearInterval(progressInterval);
    });

    return {
      showNotification,
      currentNotification,
      progressBarClass,
      progress,
      hideNotification,
      getDefaultTitle
    };
  }
};

const {createElementVNode:_createElementVNode,openBlock:_openBlock,createElementBlock:_createElementBlock,createCommentVNode:_createCommentVNode,toDisplayString:_toDisplayString,normalizeClass:_normalizeClass,normalizeStyle:_normalizeStyle,Transition:_Transition,withCtx:_withCtx,createVNode:_createVNode} = await importShared('vue');


const _hoisted_1 = {
  "aria-live": "assertive",
  class: "fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50"
};
const _hoisted_2 = { class: "w-full flex flex-col items-center space-y-4 sm:items-end" };
const _hoisted_3 = {
  key: 0,
  class: "max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 relative overflow-hidden"
};
const _hoisted_4 = { class: "p-4" };
const _hoisted_5 = { class: "flex items-start" };
const _hoisted_6 = { class: "flex-shrink-0" };
const _hoisted_7 = {
  key: 0,
  class: "h-6 w-6 text-red-400",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
};
const _hoisted_8 = {
  key: 1,
  class: "h-6 w-6 text-green-400",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
};
const _hoisted_9 = {
  key: 2,
  class: "h-6 w-6 text-blue-400",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
};
const _hoisted_10 = { class: "ml-3 w-0 flex-1" };
const _hoisted_11 = { class: "text-sm font-medium text-gray-900 dark:text-white" };
const _hoisted_12 = { class: "mt-1 text-sm text-gray-500 dark:text-gray-400" };
const _hoisted_13 = { class: "ml-4 flex-shrink-0 flex" };
const _hoisted_14 = { class: "absolute bottom-0 left-0 right-0" };

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("div", _hoisted_2, [
      _createVNode(_Transition, {
        "enter-active-class": "transform ease-out duration-300 transition",
        "enter-from-class": "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2",
        "enter-to-class": "translate-y-0 opacity-100 sm:translate-x-0",
        "leave-active-class": "transition ease-in duration-100",
        "leave-from-class": "opacity-100",
        "leave-to-class": "opacity-0"
      }, {
        default: _withCtx(() => [
          ($setup.showNotification)
            ? (_openBlock(), _createElementBlock("div", _hoisted_3, [
                _createElementVNode("div", _hoisted_4, [
                  _createElementVNode("div", _hoisted_5, [
                    _createElementVNode("div", _hoisted_6, [
                      ($setup.currentNotification.type === 'error')
                        ? (_openBlock(), _createElementBlock("svg", _hoisted_7, _cache[1] || (_cache[1] = [
                            _createElementVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            }, null, -1)
                          ])))
                        : ($setup.currentNotification.type === 'success')
                          ? (_openBlock(), _createElementBlock("svg", _hoisted_8, _cache[2] || (_cache[2] = [
                              _createElementVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              }, null, -1)
                            ])))
                          : (_openBlock(), _createElementBlock("svg", _hoisted_9, _cache[3] || (_cache[3] = [
                              _createElementVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              }, null, -1)
                            ])))
                    ]),
                    _createElementVNode("div", _hoisted_10, [
                      _createElementVNode("p", _hoisted_11, _toDisplayString($setup.currentNotification.title || $setup.getDefaultTitle), 1),
                      _createElementVNode("p", _hoisted_12, _toDisplayString($setup.currentNotification.message), 1)
                    ]),
                    _createElementVNode("div", _hoisted_13, [
                      _createElementVNode("button", {
                        onClick: _cache[0] || (_cache[0] = (...args) => ($setup.hideNotification && $setup.hideNotification(...args))),
                        class: "bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                      }, _cache[4] || (_cache[4] = [
                        _createElementVNode("span", { class: "sr-only" }, "Cerrar", -1),
                        _createElementVNode("svg", {
                          class: "h-5 w-5",
                          viewBox: "0 0 20 20",
                          fill: "currentColor"
                        }, [
                          _createElementVNode("path", {
                            "fill-rule": "evenodd",
                            d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                            "clip-rule": "evenodd"
                          })
                        ], -1)
                      ]))
                    ])
                  ]),
                  _createElementVNode("div", _hoisted_14, [
                    _createElementVNode("div", {
                      class: _normalizeClass(["h-1 transition-all duration-300", $setup.progressBarClass]),
                      style: _normalizeStyle({ width: `${$setup.progress}%` })
                    }, null, 6)
                  ])
                ])
              ]))
            : _createCommentVNode("", true)
        ]),
        _: 1
      })
    ])
  ]))
}
const NotificationListener = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

export { NotificationListener as default };
