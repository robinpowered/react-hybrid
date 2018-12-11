import { padString } from '@uirouter/core';
export var debugLog = function(angularOrReact, component, id, method, message) {
  var args = [];
  for (var _i = 5; _i < arguments.length; _i++) {
    args[_i - 5] = arguments[_i];
  }
  if (window && window['debugReactHybrid'] !== true) return;
  console.log.apply(
    console,
    [
      padString(12, angularOrReact) +
        ' ' +
        padString(40, component + '[' + id + ']') +
        ' ' +
        padString(35, method + ':') +
        ' ' +
        message,
    ].concat(args)
  );
};
//# sourceMappingURL=debug.js.map
