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
          var originalType_1 = view.$type;
          var originalComponent_1 = view.component;
          var originalExit = view.$context.onExit;
          // Once the view exits, reset the view type, so `componentProvider` runs again.
          if (!originalExit || !originalExit.$$__ui_router_react_view_fixer) {
            var originalExitDeps = __spreadArrays(originalExit || []);
            var originalExitFn_1 = originalExitDeps.pop();
            view.$context.onExit = __spreadArrays(originalExitDeps, [
              function() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
                }
                if (view.$type !== originalType_1) {
                  view.$type = originalType_1;
                }
                if (view.component !== originalComponent_1) {
                  view.component = originalComponent_1;
                }
                if (typeof originalExitFn_1 === "function") {
                  return originalExitFn_1.apply(void 0, args);
                }
              }
            ]);
            // Only decorate the onExit once per state declaration.
            view.$context.onExit.$$__ui_router_react_view_fixer = true;
          }
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
              view.$type = selfViews[key].$type || reactType || view.$type;
              if (view.$type === "react") {
                // Set the component, if it's react, as `ReactViewConfig` expects the `component`
                // property.
                view.component = cmp;
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
