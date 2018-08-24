'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var React = require('react');
var module_1 = require('./angularjs/module');
var react_1 = require('@uirouter/react');
/**
 * Registers a `react` view config factory which is invoked when `view.$type === 'react'`.
 *
 * Decorates the `views: {}` registered on states.
 * Detects if a `component:` is a React Component and sets `view.$type = 'react'` if so
 */
module_1.hybridModule.config([
  '$uiRouterProvider',
  function(router) {
    var factory = function(path, config) {
      return new react_1.ReactViewConfig(path, config);
    };
    // Add the react view config factory for react views
    router.viewService._pluginapi._viewConfigFactory('react', factory);
    // Decorate states at registration time with the view type
    router.stateRegistry.decorator('views', function(state, parentDecorator) {
      var views = parentDecorator(state);
      var self = state.self;
      var selfViews = self.views || { $default: self };
      var isReactComponent = function(cmp) {
        return (
          cmp instanceof React.Component ||
          (cmp && cmp.prototype && cmp.prototype.isReactComponent) ||
          (cmp && cmp.prototype && typeof cmp.prototype.render === 'function')
        );
      };
      Object.keys(views).forEach(function(key) {
        var view = views[key];
        var selfView = selfViews[key || '$default'];
        var reactType = isReactComponent(view.component) && 'react';
        view.$type = selfViews[key].$type || reactType || view.$type;
      });
      return views;
    });
  },
]);
//# sourceMappingURL=decorateUIRouterViewConfigs.js.map
