'use strict';
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
    };
  })();
Object.defineProperty(exports, '__esModule', { value: true });
var React = require('react');
var UIRouterReactContext_1 = require('./UIRouterReactContext');
/**
 * A decorator that provides the UIRouter state context allowing
 * React components to use the @uirouter/react components such as UISref
 *
 * Example:
 *
 * import { UISref, UISrefActive, UIView } from '@uirouter/react';
 *
 * @UIRouterContext
 * class MyComponent extends React.Component<any, any> {
 *   render() {
 *     return (
 *       <UISrefActive class="active">
 *         <UISref to=".neststate" params={{ id: this.props.someid }}>
 *           <a>Go to item {this.props.someid}</a>
 *         </UISref>
 *       </UISrefActive>
 *
 *       <UIView/>
 *     )
 *   }
 * }
 *
 * @param Component the react component to wrap
 */
function UIRouterContext(Component) {
  return /** @class */ (function(_super) {
    __extends(class_1, _super);
    function class_1() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    class_1.prototype.render = function() {
      return React.createElement(
        UIRouterReactContext_1.UIRouterContextComponent,
        null,
        React.createElement(Component, this.props)
      );
    };
    return class_1;
  })(React.Component);
}
exports.UIRouterContext = UIRouterContext;
//# sourceMappingURL=UIRouterReactContextDecorator.js.map
