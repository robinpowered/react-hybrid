'use strict';
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __rest =
  (this && this.__rest) ||
  function(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    return t;
  };
Object.defineProperty(exports, '__esModule', { value: true });
var React = require('react');
var ReactDOM = require('react-dom');
var module_1 = require('./module');
var react_1 = require('@uirouter/react');
var core_1 = require('@uirouter/core');
var UIRouterReactContext_1 = require('../react/UIRouterReactContext');
// When an angularjs `ui-view` is instantiated, also create an react-ui-view-adapter (which creates a react UIView)
module_1.hybridModule.directive('uiView', function() {
  return {
    restrict: 'AE',
    compile: function(tElem, tAttrs) {
      var name = tAttrs.name,
        uiView = tAttrs.uiView;
      name = name || uiView || '$default';
      // console.log('Creating react-ui-view-adapter', tElem);
      tElem.html('<react-ui-view-adapter name="' + name + '"></react-ui-view-adapter>');
    },
  };
});
var id = 0;
// This angularjs adapter (inside an angularjs ui-view) creates the react UIView and provides it the correct context
// It also allows angularjs children created inside the react view (via angular2react or whatever) to access the correct
// context from the react UIView
module_1.hybridModule.directive('reactUiViewAdapter', function() {
  return {
    restrict: 'E',
    link: function(scope, elem, attrs) {
      var el = elem[0];
      var _ref = null;
      var destroyed = false;
      var $id = id++;
      var ignoredAttrKeys = ['$$element', '$attr'];
      attrs = core_1.filter(attrs, function(val, key) {
        return ignoredAttrKeys.indexOf(key) === -1;
      });
      // console.log(`${$id}: linking react-ui-view-adapter into `, el, attrs)
      var log = function(msg, UIViewRef) {
        var id = UIViewRef && UIViewRef.state && UIViewRef.state.id;
        var cmp = UIViewRef && UIViewRef.componentInstance;
        console.log(msg, 'Has UIViewRef: ' + !!UIViewRef, id, cmp);
      };
      // The UIView ref callback, which is called after the initial render
      var ref = function(ref) {
        if (
          // If refs are the same - don't re-render React component.
          (ref && _ref === ref) ||
          // If previously there was a ref, and the new `ref` is empty - the component was unmounted.
          // Leave the unmounted component as it was, and don't try to re-mount it.
          (!ref && _ref)
        ) {
          return;
        }
        _ref = ref;
        // log(`${$id}: received new React UIView ref:`, ref);
        // Add the $uiView data to the adapter element to provide context to child angular elements
        provideContextToAngularJSChildren();
        renderReactUIView();
      };
      // The render callback for the React UIView
      var render = function(cmp, props) {
        // log('render', _ref);
        provideContextToAngularJSChildren();
        // Only create the children when the _ref is ready
        return !_ref ? null : React.createElement(cmp, props);
      };
      var provideContextToAngularJSChildren = function() {
        var $cfg = _ref && _ref.uiViewData && _ref.uiViewData.config;
        var $uiView = _ref && _ref.uiViewAddress;
        // console.log(`${$id}: providing context to angularjs children`, el, $cfg, $uiView);
        if (!$cfg || !$uiView) {
          elem.removeData('$uiView');
        } else {
          elem.data('$uiView', { $cfg: $cfg, $uiView: $uiView });
        }
      };
      function renderReactUIView() {
        // console.log(`${$id}: rendering react uiview into container`, el);
        if (destroyed) {
          // console.error(`${$id}: react-ui-view-adapter has already been destroyed -- not rendering React UIView`);
          return;
        }
        var props = __assign({}, attrs, { render: render, wrap: false, refFn: ref });
        // console.log(`${$id}: rendering ReactUIView with props`, props);
        ReactDOM.render(React.createElement(ReactUIView, __assign({}, props)), el);
      }
      scope.$on('$destroy', function() {
        destroyed = true;
        var unmounted = ReactDOM.unmountComponentAtNode(el);
        // console.log(`${$id}: angular $destroy event -- unmountComponentAtNode(): ${unmounted}`, el);
        // Remove using jQLite element for cross-browser compatibility.
        elem.remove();
      });
      renderReactUIView();
    },
  };
});
var InternalUIView = react_1.UIView.__internalViewComponent;
var ReactUIView = function(_a) {
  var refFn = _a.refFn,
    props = __rest(_a, ['refFn']);
  return React.createElement(
    UIRouterReactContext_1.UIRouterContextComponent,
    { parentContextLevel: '3' },
    React.createElement(react_1.UIRouterConsumer, null, function(router) {
      return React.createElement(react_1.UIViewConsumer, null, function(parentUiView) {
        return React.createElement(
          InternalUIView,
          __assign({}, props, { ref: refFn, parentUIView: parentUiView, router: router })
        );
      });
    })
  );
};
//# sourceMappingURL=ReactUIViewAdapterComponent.js.map
