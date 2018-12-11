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
import * as React from 'react';
import { UIView } from '@uirouter/react';
import { debugLog } from '../debug';
import { PortalView } from './PortalView';
var realRender = UIView.prototype.render;
/**
 * Monkey patches the @uirouter/react UIView such that:
 *
 * When a @uirouter/react `<UIView/>` is rendered (from react code),
 * it renders first to an AngularJS `<ui-view>` component,
 * inside the `ui-view` is an AngularJS `<react-ui-view-adapter>`,
 * which finally renders a real @uirouter/react `<UIView/>`:
 *
 * <ui-view name="name">
 *   <react-ui-view-adapter name="name">
 *     <UIView wrap={false} name="name">
 *       <RoutedReactComponent/>
 *     </UIView>
 *   </react-ui-view-adapter>
 * </ui-view>
 */
UIView.prototype.render = function() {
  if (this.props.wrap === false) {
    var id = this.$id + '/' + this.props['name'];
    debugLog('react', 'UIViewMonkeyPatch', id, '.render()', 'realRender.apply(this, arguments)');
    return realRender.apply(this, arguments);
  }
  return React.createElement(PortalView, __assign({}, this.props));
};
//# sourceMappingURL=UIViewMonkeyPatch.js.map
