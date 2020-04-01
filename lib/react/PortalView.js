"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var debug_1 = require("../debug");
var AngularUIView_1 = require("./AngularUIView");
var ReactUIView_1 = require("./ReactUIView");
var id = 0;
/**
 * This react component renders the AngularUIView react component
 * and also creates React Portals as needed for child React UIViews.
 */
var PortalView = /** @class */ (function (_super) {
    __extends(PortalView, _super);
    function PortalView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.$id = id++;
        _this.state = { portals: [] };
        _this.debug = function (method, message) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            return debug_1.debugLog.apply(void 0, __spreadArrays(['react', 'PortalView', _this.$id + "/" + _this.props['name'], method, message], args));
        };
        _this.createPortalToChildUIView = function (uiViewId, childUIView) {
            _this.debug('.createPortalToChildUIView()', JSON.stringify(childUIView.childUIViewProps), childUIView.portalTarget);
            _this.setState(function (prev) {
                var _a;
                var portals = __assign(__assign({}, prev.portals), (_a = {}, _a[uiViewId] = childUIView, _a));
                return { portals: portals };
            });
        };
        _this.removePortalToChildUIView = function (uiViewId) {
            var childUIView = _this.state.portals[uiViewId] || {};
            _this.debug('.removePortalToChildUIView()', "" + uiViewId, childUIView.childUIViewProps, childUIView.portalTarget);
            _this.setState(function (prev) {
                var portals = __assign({}, prev.portals);
                delete portals[uiViewId];
                return { portals: portals };
            });
        };
        return _this;
    }
    PortalView.prototype.componentWillUnmount = function () {
        this.debug('.componentWillUnmount()', '');
    };
    PortalView.prototype.renderPortals = function () {
        var _this = this;
        var portals = this.state.portals;
        var method = ".renderPortals()";
        Object.keys(portals).forEach(function (key) {
            var portal = portals[key];
            _this.debug(method, "ReactDOM.createPortal(" + key + ")", '', portal.childUIViewProps, portal.portalTarget);
        });
        return Object.keys(portals).map(function (key) {
            var portal = portals[key];
            // No mechanism to provide a key when creating a portals array?
            return (React.createElement("div", { style: { display: 'none' }, key: "" + key }, ReactDOM.createPortal(React.createElement(ReactUIView_1.ReactUIView, __assign({}, portal.childUIViewProps)), portal.portalTarget)));
        });
    };
    PortalView.prototype.render = function () {
        this.debug('.render()', '');
        return (React.createElement(React.Fragment, null,
            React.createElement(AngularUIView_1.AngularUIView, __assign({}, this.props, { portalView: this })),
            this.renderPortals()));
    };
    return PortalView;
}(React.PureComponent));
exports.PortalView = PortalView;
//# sourceMappingURL=PortalView.js.map