import * as angular from 'angular';
import * as React from 'react';
import { useContext, useRef, useState } from 'react';
import { UIRouterContext, UIViewContext } from '@uirouter/react';
var initialState = { router: undefined, addr: undefined };
/**
 * Provide react context necessary for UIView, UISref and UISrefActive
 *
 * Gets the context from the parent react UIView (if component tree is all react)
 * Gets the context from the from parent angular ui-view if no parent reat UIView is available
 */
export function UIRouterContextComponent(props) {
    var parentContextLevel = props.parentContextLevel, inherited = props.inherited, children = props.children;
    var _a = useState(initialState), contextFromAngularJS = _a[0], setContextFromAngularJS = _a[1];
    var routerFromReactContext = useContext(UIRouterContext);
    var parentUIViewFromReactContext = useContext(UIViewContext);
    var domRef = useRef(null);
    // Once we have a DOM node, get the AngularJS injector and walk up the DOM to find the AngularJS $uiView
    var refCallback = function (el) {
        if (el && el !== domRef.current) {
            domRef.current = el;
            var injector = angular.element(el).injector();
            // get router from angularjs
            var router = injector === null || injector === void 0 ? void 0 : injector.get('$uiRouter');
            // get parent uiview from angularjs
            var steps = parseInt(parentContextLevel, 10);
            steps = isNaN(steps) ? 0 : steps;
            while (el && steps--)
                el = el.parentElement;
            var $uiView = el && angular.element(el).inheritedData('$uiView');
            var addr = $uiView && new ParentUIViewAddressAdapter($uiView);
            setContextFromAngularJS({ router: router, addr: addr });
        }
    };
    // render a div once to get a ref into the dom
    // Use the dom ref to access the AngularJS state
    if (!domRef.current) {
        return React.createElement("div", { ref: refCallback });
    }
    // We know the AngularJS state. Now render the {children}
    var childrenCount = React.Children.count(children);
    return (React.createElement(UIRouterContext.Provider, { value: (inherited && routerFromReactContext) || contextFromAngularJS.router },
        React.createElement(UIViewContext.Provider, { value: (inherited && parentUIViewFromReactContext) || contextFromAngularJS.addr }, childrenCount === 1 ? React.Children.only(children) : React.createElement("div", null, children))));
}
UIRouterContextComponent.defaultProps = {
    parentContextLevel: '0',
    inherited: true,
};
/**
 * Get the fqn and context from the parent angularjs ui-view.
 * Uses the ui-view element's data
 */
var ParentUIViewAddressAdapter = /** @class */ (function () {
    function ParentUIViewAddressAdapter(_ngdata) {
        this._ngdata = _ngdata;
        if (!_ngdata)
            throw new Error('@uirouter/react-hybrid: Address Adapter created with no _ngdata parameter.');
    }
    Object.defineProperty(ParentUIViewAddressAdapter.prototype, "fqn", {
        get: function () {
            return this._ngdata.$uiView.fqn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParentUIViewAddressAdapter.prototype, "context", {
        get: function () {
            if (!this._ngdata || !this._ngdata.$cfg || !this._ngdata.$cfg.viewDecl) {
                console.log(this._ngdata);
                throw new Error('@uirouter/react-hybrid: Uh oh. Views are in an invalid state. Parent UIView has no $cfg or viewDecl');
            }
            return this._ngdata.$cfg.viewDecl.$context || this._ngdata.$uiView.creationContext;
        },
        enumerable: true,
        configurable: true
    });
    return ParentUIViewAddressAdapter;
}());
//# sourceMappingURL=UIRouterReactContext.js.map