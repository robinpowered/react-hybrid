var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
import * as React from "react";
import { hybridModule } from "./angularjs/module";
import { ReactViewConfig } from "@uirouter/react";
/**
 * Registers a `react` view config factory which is invoked when `view.$type === 'react'`.
 *
 * Decorates the `views: {}` registered on states.
 * Detects if a `component:` is a React Component and sets `view.$type = 'react'` if so
 */
var wrapperFactory = function(view, cmp, originalType, originalComponent) {
  return /** @class */ (function(_super) {
    __extends(WrapperComponent, _super);
    function WrapperComponent() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    WrapperComponent.prototype.componentWillUnmount = function() {
      if (view) {
        // Revert back to original, unmodified type & component after this wrapper unmounts.
        view.$type = originalType;
        view.component = originalComponent;
      }
    };
    WrapperComponent.prototype.render = function() {
      return React.createElement(cmp, this.props, this.props.children);
    };
    return WrapperComponent;
  })(React.Component);
};
hybridModule.config([
  "$uiRouterProvider",
  function(router) {
    var factory = function(path, config) {
      return new ReactViewConfig(path, config);
    };
    // Add the react view config factory for react views
    router.viewService._pluginapi._viewConfigFactory("react", factory);
    // Decorate states at registration time with the view type
    router.stateRegistry.decorator("views", function(state, parentDecorator) {
      var views = parentDecorator(state);
      var self = state.self;
      var selfViews = self.views || { $default: self };
      var isReactComponent = function(cmp) {
        return (
          cmp instanceof React.Component ||
          (cmp && cmp.prototype && cmp.prototype.isReactComponent) ||
          (cmp &&
            cmp.prototype &&
            typeof cmp.prototype.render === "function") ||
          (cmp && typeof cmp === "function")
        );
      };
      Object.keys(views).forEach(function(key) {
        var view = views[key];
        if (view.componentProvider) {
          // If view component provider is given, monkey-patch the type in runtime.
          var injectables = __spreadArrays(view.componentProvider);
          // Remove the runner function, and just leave `injectables` with deps.
          var func_1 = injectables.pop();
          // Create a new component provider.
          view.componentProvider = __spreadArrays(injectables, [
            function() {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              // Get the component declaration.
              var cmp = func_1.apply(void 0, args);
              // Determine if it's react.
              var reactType = isReactComponent(cmp) && "react";
              // Preserve the original type & component.
              var originalType = view.$type;
              var originalComponent = view.component;
              view.$type = selfViews[key].$type || reactType || view.$type;
              if (view.$type === "react") {
                // Set the component, if it's react, as `ReactViewConfig` expects the `component`
                // property.
                view.component = wrapperFactory(
                  view,
                  cmp,
                  originalType,
                  originalComponent
                );
              }
              // Also return component for AngularjS components.
              return cmp;
            }
          ]);
        } else {
          var selfView = selfViews[key || "$default"];
          var reactType = isReactComponent(view.component) && "react";
          view.$type = selfViews[key].$type || reactType || view.$type;
        }
      });
      return views;
    });
  }
]);
//# sourceMappingURL=decorateUIRouterViewConfigs.js.map
