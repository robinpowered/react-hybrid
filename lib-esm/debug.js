var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { padString } from '@uirouter/core';
export var debugLog = function (angularOrReact, component, id, method, message) {
    var args = [];
    for (var _i = 5; _i < arguments.length; _i++) {
        args[_i - 5] = arguments[_i];
    }
    if (window && window['debugReactHybrid'] !== true)
        return;
    console.log.apply(console, __spreadArrays([padString(12, angularOrReact) + " " + padString(40, component + "[" + id + "]") + " " + padString(35, method + ":") + " " + message], args));
};
//# sourceMappingURL=debug.js.map