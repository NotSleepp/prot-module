import { importShared } from './__federation_fn_import-BwnnmZbt.js';
import eventBus, { EventTypes } from './__federation_expose_EventBus-CAM94XHk.js';
import { _export_sfc } from './_plugin-vue_export-helper-8ijppmbV.js';

const {defineComponent} = await importShared('vue');

const _sfc_main$1 = defineComponent({
  name: 'Modal',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'large'].includes(value)
    },
    closeOnClickOutside: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'close'],
  setup(props, { emit }) {
    const close = () => {
      emit('update:modelValue', false);
      emit('close');
      eventBus.emit(EventTypes.USER_ACTION, {
        action: 'modal_close',
        timestamp: new Date().toISOString()
      });
    };

    const closeOnBackdrop = (event) => {
      if (props.closeOnClickOutside && event.target === event.currentTarget) {
        close();
      }
    };

    return {
      close,
      closeOnBackdrop
    };
  }
});

const {openBlock:_openBlock$1,createElementBlock:_createElementBlock$1,createCommentVNode:_createCommentVNode,Transition:_Transition,withCtx:_withCtx$1,createVNode:_createVNode$1,renderSlot:_renderSlot,toDisplayString:_toDisplayString,createTextVNode:_createTextVNode,createElementVNode:_createElementVNode$1,normalizeClass:_normalizeClass,Teleport:_Teleport,createBlock:_createBlock} = await importShared('vue');


const _hoisted_1$1 = {
  key: 0,
  class: "fixed inset-0 bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity z-40"
};
const _hoisted_2$1 = { class: "flex min-h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0" };
const _hoisted_3$1 = { class: "bg-white dark:bg-gray-900 px-4 pb-4 pt-5 sm:p-6 sm:pb-4" };
const _hoisted_4$1 = { class: "sm:flex sm:items-start" };
const _hoisted_5$1 = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" };
const _hoisted_6$1 = { class: "text-lg font-medium leading-6 text-gray-900 dark:text-white" };
const _hoisted_7$1 = { class: "mt-4" };
const _hoisted_8$1 = {
  key: 0,
  class: "bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
};

function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock$1(), _createBlock(_Teleport, { to: "body" }, [
    _createVNode$1(_Transition, {
      "enter-active-class": "transition ease-out duration-300",
      "enter-from-class": "opacity-0",
      "enter-to-class": "opacity-100",
      "leave-active-class": "transition ease-in duration-200",
      "leave-from-class": "opacity-100",
      "leave-to-class": "opacity-0"
    }, {
      default: _withCtx$1(() => [
        (_ctx.modelValue)
          ? (_openBlock$1(), _createElementBlock$1("div", _hoisted_1$1))
          : _createCommentVNode("", true)
      ]),
      _: 1
    }),
    _createVNode$1(_Transition, {
      "enter-active-class": "transition ease-out duration-300",
      "enter-from-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
      "enter-to-class": "opacity-100 translate-y-0 sm:scale-100",
      "leave-active-class": "transition ease-in duration-200",
      "leave-from-class": "opacity-100 translate-y-0 sm:scale-100",
      "leave-to-class": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    }, {
      default: _withCtx$1(() => [
        (_ctx.modelValue)
          ? (_openBlock$1(), _createElementBlock$1("div", {
              key: 0,
              class: "fixed inset-0 z-50 overflow-y-auto",
              onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.closeOnBackdrop && _ctx.closeOnBackdrop(...args)))
            }, [
              _createElementVNode$1("div", _hoisted_2$1, [
                _createElementVNode$1("div", {
                  class: _normalizeClass(["relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-900 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg", [_ctx.size === 'large' ? 'sm:max-w-4xl' : 'sm:max-w-lg']])
                }, [
                  _createElementVNode$1("div", _hoisted_3$1, [
                    _createElementVNode$1("div", _hoisted_4$1, [
                      _createElementVNode$1("div", _hoisted_5$1, [
                        _createElementVNode$1("h3", _hoisted_6$1, [
                          _renderSlot(_ctx.$slots, "header", {}, () => [
                            _createTextVNode(_toDisplayString(_ctx.title), 1)
                          ])
                        ])
                      ]),
                      _createElementVNode$1("button", {
                        onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.close && _ctx.close(...args))),
                        class: "absolute right-4 top-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                      }, _cache[2] || (_cache[2] = [
                        _createElementVNode$1("span", { class: "sr-only" }, "Cerrar", -1),
                        _createElementVNode$1("svg", {
                          class: "h-6 w-6",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          _createElementVNode$1("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M6 18L18 6M6 6l12 12"
                          })
                        ], -1)
                      ]))
                    ]),
                    _createElementVNode$1("div", _hoisted_7$1, [
                      _renderSlot(_ctx.$slots, "default")
                    ])
                  ]),
                  (_ctx.$slots.footer)
                    ? (_openBlock$1(), _createElementBlock$1("div", _hoisted_8$1, [
                        _renderSlot(_ctx.$slots, "footer")
                      ]))
                    : _createCommentVNode("", true)
                ], 2)
              ])
            ]))
          : _createCommentVNode("", true)
      ]),
      _: 3
    })
  ]))
}
const Modal = /*#__PURE__*/_export_sfc(_sfc_main$1, [['render',_sfc_render$1]]);

const {ref} = await importShared('vue');

const _sfc_main = {
  name: 'Home',
  components: {
    Modal
  },
  setup() {
    const showModal = ref(false);

    const showSuccessNotification = () => {
      eventBus.emit(EventTypes.SUCCESS, {
        message: '¡Operación completada con éxito!'
      });
    };

    const showErrorNotification = () => {
      eventBus.emit(EventTypes.ERROR, {
        message: 'Ha ocurrido un error en la operación'
      });
    };

    return {
      showModal,
      showSuccessNotification,
      showErrorNotification
    };
  }
};

const {createElementVNode:_createElementVNode,resolveComponent:_resolveComponent,withCtx:_withCtx,createVNode:_createVNode,openBlock:_openBlock,createElementBlock:_createElementBlock} = await importShared('vue');


const _hoisted_1 = { class: "min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8" };
const _hoisted_2 = { class: "max-w-7xl mx-auto" };
const _hoisted_3 = { class: "mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2" };
const _hoisted_4 = { class: "bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg" };
const _hoisted_5 = { class: "px-4 py-5 sm:p-6" };
const _hoisted_6 = { class: "mt-5 space-y-3" };
const _hoisted_7 = { class: "bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg" };
const _hoisted_8 = { class: "px-4 py-5 sm:p-6" };
const _hoisted_9 = { class: "mt-5" };

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Modal = _resolveComponent("Modal");

  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("div", _hoisted_2, [
      _cache[7] || (_cache[7] = _createElementVNode("div", { class: "text-center" }, [
        _createElementVNode("h1", { class: "text-4xl font-bold text-gray-900 dark:text-white mb-4" }, " Bienvenido a la Demo "),
        _createElementVNode("p", { class: "text-lg text-gray-500 dark:text-gray-400" }, " Prueba las diferentes funcionalidades disponibles ")
      ], -1)),
      _createElementVNode("div", _hoisted_3, [
        _createElementVNode("div", _hoisted_4, [
          _createElementVNode("div", _hoisted_5, [
            _cache[5] || (_cache[5] = _createElementVNode("h3", { class: "text-lg font-medium text-gray-900 dark:text-white" }, " Notificaciones ", -1)),
            _createElementVNode("div", _hoisted_6, [
              _createElementVNode("button", {
                onClick: _cache[0] || (_cache[0] = (...args) => ($setup.showSuccessNotification && $setup.showSuccessNotification(...args))),
                class: "w-full inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800"
              }, " Mostrar Éxito "),
              _createElementVNode("button", {
                onClick: _cache[1] || (_cache[1] = (...args) => ($setup.showErrorNotification && $setup.showErrorNotification(...args))),
                class: "w-full inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
              }, " Mostrar Error ")
            ])
          ])
        ]),
        _createElementVNode("div", _hoisted_7, [
          _createElementVNode("div", _hoisted_8, [
            _cache[6] || (_cache[6] = _createElementVNode("h3", { class: "text-lg font-medium text-gray-900 dark:text-white" }, " Modal ", -1)),
            _createElementVNode("div", _hoisted_9, [
              _createElementVNode("button", {
                onClick: _cache[2] || (_cache[2] = $event => ($setup.showModal = true)),
                class: "w-full inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800"
              }, " Abrir Modal ")
            ])
          ])
        ])
      ])
    ]),
    _createVNode(_component_Modal, {
      modelValue: $setup.showModal,
      "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => (($setup.showModal) = $event)),
      title: "Ejemplo de Modal"
    }, {
      footer: _withCtx(() => [
        _createElementVNode("button", {
          onClick: _cache[3] || (_cache[3] = $event => ($setup.showModal = false)),
          class: "inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800"
        }, " Cerrar ")
      ]),
      default: _withCtx(() => [
        _cache[8] || (_cache[8] = _createElementVNode("div", { class: "prose dark:prose-invert" }, [
          _createElementVNode("p", { class: "text-gray-500 dark:text-gray-400" }, " Este es un ejemplo de modal que soporta tema claro y oscuro. Puedes usar este componente en cualquier parte de la aplicación. ")
        ], -1))
      ]),
      _: 1,
      __: [8]
    }, 8, ["modelValue"])
  ]))
}
const Home = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

export { Home as default };
