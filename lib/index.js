'use strict';
function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, '__esModule', { value: true });
require('@uirouter/angularjs');
require('@uirouter/react');
require('./decorateUIRouterViewConfigs');
require('./angularjs/ReactUIViewAdapterComponent');
require('./react/UIViewMonkeyPatch');
__export(require('./angularjs/module'));
__export(require('./react/UIRouterReactContext'));
__export(require('./react/UIRouterReactContextDecorator'));
//# sourceMappingURL=index.js.map
