import * as React from 'react';
import { hybridModule } from './angularjs/module';
import { PathNode, StateObject, UIRouter } from '@uirouter/core';
import { ReactViewConfig, ReactViewDeclaration } from '@uirouter/react';

hybridModule.config([
  '$uiRouterProvider',
  (router: UIRouter) => {
    const factory = (path: [PathNode], config: ReactViewDeclaration) => new ReactViewConfig(path, config);

    // Add the react view config factory for react views
    router.viewService._pluginapi._viewConfigFactory('react', factory);

    // Decorate states at registration time with the view type
    router.stateRegistry.decorator('views', (state: StateObject, parentDecorator) => {
      const views = parentDecorator(state);

      const self = state.self;
      const selfViews = self.views || { $default: self };
      const isReactComponent = cmp =>
        cmp instanceof React.Component ||
        (cmp && cmp.prototype && cmp.prototype.isReactComponent) ||
        (cmp && cmp.prototype && typeof cmp.prototype.render === 'function') ||
        (cmp && typeof cmp === 'function');

      Object.keys(views).forEach(key => {
        const view = views[key];
        if (view.componentProvider) {
          // If view component provider is given, monkey-patch the type in runtime.
          const injectables = [...view.componentProvider];
          // Remove the runner function, and just leave `injectables` with deps.
          const func = injectables.pop();

          const originalType = view.$type;
          const originalComponent = view.component;
          const originalExit = view.$context.onExit;
          // Once the view exits, reset the view type, so `componentProvider` runs again.
          if (!originalExit || !originalExit.$$__ui_router_react_view_fixer) {
            const originalExitDeps = [...(originalExit || [])];
            const originalExitFn = originalExitDeps.pop();

            view.$context.onExit = [
              ...originalExitDeps,
              // It's fine to have multiple injectables w/ the same name.
              '$transition$',
              function(...args, $transision$) {
                if ($transision$.from() !== $transision$.to()) {
                  // If we are actually changing the states.
                  // Updating parameters should not result in us re-building the component & state.
                  if (view.$type !== originalType) {
                    view.$type = originalType;
                  }

                  if (view.component !== originalComponent) {
                    view.component = originalComponent;
                  }
                }

                if (typeof originalExitFn === 'function') {
                  return originalExitFn(...args);
                }
              },
            ];

            // Only decorate the onExit once per state declaration.
            view.$context.onExit.$$__ui_router_react_view_fixer = true;
          }

          // Create a new component provider.
          view.componentProvider = [
            // Original injectables.
            ...injectables,
            (...args) => {
              // Get the component declaration.
              const cmp = func(...args);
              // Determine if it's react.
              var reactType = isReactComponent(cmp) && 'react';
              view.$type = selfViews[key].$type || reactType || view.$type;

              if (view.$type === 'react') {
                // Set the component, if it's react, as `ReactViewConfig` expects the `component`
                // property.
                view.component = cmp;
              }
              // Also return component for AngularjS components.
              return cmp;
            },
          ];
        } else {
          var selfView = selfViews[key || '$default'];
          var reactType = isReactComponent(view.component) && 'react';
          view.$type = selfViews[key].$type || reactType || view.$type;
        }
      });

      return views;
    });
  },
]);
