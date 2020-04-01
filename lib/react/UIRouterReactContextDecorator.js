"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var UIRouterReactContext_1 = require("./UIRouterReactContext");
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
    return function (props) { return React.createElement(UIRouterReactContext_1.UIRouterContextComponent, null, React.createElement(Component, props)); };
}
exports.UIRouterContext = UIRouterContext;
//# sourceMappingURL=UIRouterReactContextDecorator.js.map