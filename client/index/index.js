/* eslint-disable */

(function (Vue, VueDesignVue) {
  'use strict';

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;
  VueDesignVue = VueDesignVue && Object.prototype.hasOwnProperty.call(VueDesignVue, 'default') ? VueDesignVue['default'] : VueDesignVue;

  document.head.appendChild(document.createElement('style')).innerHTML = ".update-check-content {\n  text-align: center; }\n";

  //
  var script = {};

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "a-layout",
      [
        _c(
          "a-layout-sider",
          [
            _c(
              "a-menu",
              { attrs: { mode: "inline", "default-selected-keys": ["1"] } },
              [
                _c("a-menu-item", { key: "1" }, [_vm._v("Basis")]),
                _vm._v(" "),
                _c("a-menu-item", { key: "2" }, [_vm._v("Basis+")]),
                _vm._v(" "),
                _c("a-menu-item", { key: "3" }, [_vm._v("Enhance")]),
                _vm._v(" "),
                _c("a-menu-item", { key: "4" }, [_vm._v("Ultimate_Limit")])
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "a-layout",
          [
            _c(
              "a-layout-content",
              {
                class: ["update-check-content"],
                style: { margin: "24px 16px 0" }
              },
              [_c("a-spin", { attrs: { tip: "Loading ..." } })],
              1
            )
          ],
          1
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = undefined;
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      undefined,
      undefined,
      undefined
    );

  document.head.appendChild(document.createElement('style')).innerHTML = "#app {\n  width: 100%;\n  min-height: 100%;\n  padding: 0 36px 36px; }\n  #app > .ant-tabs {\n    overflow: visible; }\n    #app > .ant-tabs > .ant-tabs-bar {\n      position: -webkit-sticky;\n      position: sticky;\n      top: 0;\n      background-color: #FFF; }\n";

  //
  var script$1 = {
    components: {
      UpdateCheck: __vue_component__
    }
  };

  /* script */
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { attrs: { id: "app" } },
      [
        _c(
          "a-tabs",
          { attrs: { size: "large", "default-active-key": "1" } },
          [
            _c(
              "a-tab-pane",
              { key: "1", attrs: { tab: "Update Check" } },
              [_c("UpdateCheck")],
              1
            )
          ],
          1
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    const __vue_inject_styles__$1 = undefined;
    /* scoped */
    const __vue_scope_id__$1 = undefined;
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      undefined,
      undefined,
      undefined
    );

  Vue.use(VueDesignVue);
  new Vue({ ...__vue_component__$1
  }).$mount('#app');

}(Vue, antd));
