"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var core_1 = require("@uirouter/core");
var ReactUIView_1 = require("../react/ReactUIView");
var module_1 = require("./module");
var debug_1 = require("../debug");
// When an angularjs `ui-view` is instantiated, also create an react-ui-view-adapter (which creates a react UIView)
module_1.hybridModule.directive('uiView', function () {
    return {
        restrict: 'AE',
        compile: function (tElem, tAttrs) {
            var name = tAttrs.name, uiView = tAttrs.uiView;
            name = name || uiView || '$default';
            debug_1.debugLog('angularjs', 'ui-view', '?', '.compile()', 'Creating react-ui-view-adapter', tElem);
            tElem.html("<react-ui-view-adapter name=\"" + name + "\"></react-ui-view-adapter>");
        },
    };
});
var id = 0;
// This angularjs adapter (inside an angularjs ui-view) creates the react UIView and provides it the correct context
// It also allows angularjs children created inside the react view (via angular2react or whatever) to access the correct
// context from the react UIView
module_1.hybridModule.directive('reactUiViewAdapter', function () {
    return {
        restrict: 'E',
        link: function (scope, elem, attrs) {
            var debug = function (method, message) {
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    args[_i - 2] = arguments[_i];
                }
                return debug_1.debugLog.apply(void 0, __spreadArrays(['angularjs', 'react-ui-view-adapter', $id + "/" + attrs.name, method, message], args));
            };
            var el = elem[0];
            var _ref = null;
            var destroyed = false;
            var $id = id++;
            var ignoredAttrKeys = ['$$element', '$attr'];
            attrs = core_1.filter(attrs, function (val, key) { return ignoredAttrKeys.indexOf(key) === -1; });
            debug('.link()', 'linking react-ui-view-adapter into ', el, attrs);
            // The UIView ref callback, which is called after the initial render
            // the ref value will be the component instance
            var ref = function (ref) {
                // If refs are the same - don't re-render React component.
                var isSameRef = ref && _ref === ref;
                // If previously there was a ref, and the new `ref` is empty - the component was unmounted.
                // Leave the unmounted component as it was, and don't try to re-mount it.
                var isComponentUnmounted = !ref && _ref;
                if (isSameRef || isComponentUnmounted) {
                    return;
                }
                _ref = ref;
                debug('.ref()', 'Received new React UIView ref', ref);
                // Add the $uiView data to the adapter element to provide context to child angular elements
                provideContextToAngularJSChildren();
                renderReactUIView();
            };
            // The render callback for the React UIView
            var render = function (cmp, props) {
                debug('.render()', "has ref: " + !!_ref);
                provideContextToAngularJSChildren();
                // Only create the children when the _ref is ready
                return !_ref ? null : React.createElement(cmp, props);
            };
            var provideContextToAngularJSChildren = function () {
                var _a;
                var $cfg = (_a = _ref === null || _ref === void 0 ? void 0 : _ref.uiViewData) === null || _a === void 0 ? void 0 : _a.config;
                var $uiView = _ref === null || _ref === void 0 ? void 0 : _ref.uiViewAddress;
                debug('.provideContextToAngularJSChildren', '', el, $cfg, $uiView);
                if (!$cfg || !$uiView) {
                    elem.removeData('$uiView');
                }
                else {
                    elem.data('$uiView', { $cfg: $cfg, $uiView: $uiView });
                }
            };
            function renderReactUIView() {
                if (destroyed) {
                    debug('.renderReactUIView()', "already destroyed -- will not render React UIView");
                    return;
                }
                var childUIViewProps = __assign(__assign({}, attrs), { render: render, wrap: false, refFn: ref });
                var portalView = scope.$uiRouterReactHybridPortalView;
                if (portalView) {
                    debug('.renderReactUIView()', "will createPortalToChildUIView({ name: '" + childUIViewProps['name'] + "' })", el);
                    portalView.createPortalToChildUIView($id, { childUIViewProps: childUIViewProps, portalTarget: el });
                }
                else {
                    debug('.renderReactUIView()', "ReactDOM.render(<ReactUIView name=\"" + childUIViewProps['name'] + "\"/>)", el);
                    ReactDOM.render(React.createElement(ReactUIView_1.ReactUIView, __assign({}, childUIViewProps)), el);
                }
            }
            scope.$on('$destroy', function () {
                destroyed = true;
                var portalView = scope.$uiRouterReactHybridPortalView;
                if (portalView) {
                    portalView.removePortalToChildUIView($id);
                }
                else {
                    var unmounted = ReactDOM.unmountComponentAtNode(el);
                    debug('.$on("$destroy")', "unmountComponentAtNode(): " + unmounted, el);
                }
                // Remove using jQLite element for cross-browser compatibility.
                elem.remove();
            });
            renderReactUIView();
        },
    };
});
//# sourceMappingURL=ReactUIViewAdapterComponent.js.map