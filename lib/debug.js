'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var core_1 = require('@uirouter/core');
exports.debugLog = function(angularOrReact, component, id, method, message) {
  var args = [];
  for (var _i = 5; _i < arguments.length; _i++) {
    args[_i - 5] = arguments[_i];
  }
  if (window && window['debugReactHybrid'] !== true) return;
  console.log.apply(
    console,
    [
      core_1.padString(12, angularOrReact) +
        ' ' +
        core_1.padString(40, component + '[' + id + ']') +
        ' ' +
        core_1.padString(35, method + ':') +
        ' ' +
        message,
    ].concat(args)
  );
};
//# sourceMappingURL=debug.js.map
