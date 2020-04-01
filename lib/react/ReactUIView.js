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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("@uirouter/react");
var UIRouterReactContext_1 = require("./UIRouterReactContext");
var debug_1 = require("../debug");
var InternalUIView = react_1.UIView.__internalViewComponent;
exports.ReactUIView = function (_a) {
    var refFn = _a.refFn, props = __rest(_a, ["refFn"]);
    debug_1.debugLog('react', 'ReactUIView', "?/" + props['name'], '.render()', '');
    return (React.createElement(UIRouterReactContext_1.UIRouterContextComponent, { parentContextLevel: "3", inherited: false },
        React.createElement(InternalUIView, __assign({}, props, { ref: refFn }))));
};
//# sourceMappingURL=ReactUIView.js.map