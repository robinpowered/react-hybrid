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
var react_1 = require('@uirouter/react');
var angular = require('angular');
var React = require('react');
/**
 * Provide react context necessary for UIView, UISref and UISrefActive
 *
 * Gets the context from the parent react UIView (if component tree is all react)
 * Gets the context from the from parent angular ui-view if no parent reat UIView is available
 */
var UIRouterContextComponent = /** @class */ (function(_super) {
  __extends(UIRouterContextComponent, _super);
  function UIRouterContextComponent() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = {
      ready: false,
      router: null,
      parentUIViewAddress: null,
    };
    _this.refCallback = function(ref) {
      if (ref && ref !== _this.ref) {
        _this.ref = ref;
        _this.injector = angular.element(ref).injector();
        var router = _this.getRouterFromAngularJS();
        var parentUIViewAddress = _this.getParentViewFromAngularJS();
        _this.setState({ ready: true, router: router, parentUIViewAddress: parentUIViewAddress });
        // console.log(ref);
      }
    };
    return _this;
  }
  UIRouterContextComponent.prototype.getRouterFromAngularJS = function() {
    if (this.injector) return this.injector.get('$uiRouter');
  };
  UIRouterContextComponent.prototype.getParentViewFromAngularJS = function() {
    var ref = this.ref;
    var steps = parseInt(this.props.parentContextLevel);
    steps = isNaN(steps) ? 0 : steps;
    while (ref && steps--) ref = ref.parentElement;
    var $uiView = ref && angular.element(ref).inheritedData('$uiView');
    return $uiView && new ParentUIViewAddressAdapter($uiView);
  };
  UIRouterContextComponent.prototype.componentDidMount = function() {
    this.setState({
      parentUIViewAddress: this.getParentViewFromAngularJS(),
    });
  };
  UIRouterContextComponent.prototype.renderChild = function(child) {
    var _this = this;
    // console.log('renderChild()', child);
    var inherited = this.props.inherited;
    return React.createElement(react_1.UIRouterConsumer, null, function(routerFromReactContext) {
      return React.createElement(
        react_1.UIRouterProvider,
        { value: (inherited && routerFromReactContext) || _this.state.router },
        React.createElement(react_1.UIViewConsumer, null, function(parentUIViewFromReactContext) {
          return React.createElement(
            react_1.UIViewProvider,
            { value: (inherited && parentUIViewFromReactContext) || _this.state.parentUIViewAddress },
            child
          );
        })
      );
    });
  };
  UIRouterContextComponent.prototype.render = function() {
    var ready = this.state.ready;
    var children = this.props.children;
    var childrenCount = React.Children.count(children);
    if (!ready) {
      return React.createElement('div', { ref: this.refCallback });
    }
    return this.renderChild(
      childrenCount === 1 ? React.Children.only(children) : React.createElement('div', null, children)
    );
  };
  UIRouterContextComponent.defaultProps = {
    parentContextLevel: '0',
    inherited: true,
  };
  return UIRouterContextComponent;
})(React.Component);
exports.UIRouterContextComponent = UIRouterContextComponent;
/**
 * Get the fqn and context from the parent angularjs ui-view.
 * Uses the ui-view element's data
 */
var ParentUIViewAddressAdapter = /** @class */ (function() {
  function ParentUIViewAddressAdapter(_ngdata) {
    this._ngdata = _ngdata;
    if (!_ngdata) throw new Error('@uirouter/react-hybrid: Address Adapter created with no _ngdata parameter.');
  }
  Object.defineProperty(ParentUIViewAddressAdapter.prototype, 'fqn', {
    get: function() {
      return this._ngdata.$uiView.fqn;
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(ParentUIViewAddressAdapter.prototype, 'context', {
    get: function() {
      if (!this._ngdata || !this._ngdata.$cfg || !this._ngdata.$cfg.viewDecl) {
        console.log(this._ngdata);
        throw new Error(
          '@uirouter/react-hybrid: Uh oh. Views are in an invalid state. Parent UIView has no $cfg or viewDecl'
        );
      }
      return this._ngdata.$cfg.viewDecl.$context || this._ngdata.$uiView.creationContext;
    },
    enumerable: true,
    configurable: true,
  });
  return ParentUIViewAddressAdapter;
})();
//# sourceMappingURL=UIRouterReactContext.js.map
