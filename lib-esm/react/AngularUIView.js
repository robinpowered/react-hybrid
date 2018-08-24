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
var __rest =
  (this && this.__rest) ||
  function(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    return t;
  };
import { hybridModule } from '../angularjs/module';
import * as React from 'react';
var $injector, $rootScope, $compile;
hybridModule.run([
  '$injector',
  function(_$injector_) {
    $injector = _$injector_;
    $rootScope = _$injector_.get('$rootScope');
    $compile = _$injector_.get('$compile');
  },
]);
/**
 * A React component which renders an AngularJS <ui-view>
 * This was heavily influenced by https://github.com/coatue-oss/angular2react
 */
var AngularUIView = /** @class */ (function(_super) {
  __extends(AngularUIView, _super);
  function AngularUIView(props) {
    var _this = _super.call(this, props) || this;
    _this.state = {
      $scope: $rootScope.$new(),
    };
    return _this;
  }
  AngularUIView.prototype.render = function() {
    var _a = this.props,
      className = _a.className,
      restProps = __rest(_a, ['className']);
    var props = __assign({}, restProps, { class: className, ref: this.compile.bind(this) });
    return React.createElement('ui-view', props);
  };
  AngularUIView.prototype.compile = function(ref) {
    $compile(ref)(this.state.$scope);
  };
  AngularUIView.prototype.componentWillUnmount = function() {
    this.state.$scope.$destroy();
  };
  /** Only render once */
  AngularUIView.prototype.shouldComponentUpdate = function() {
    return false;
  };
  return AngularUIView;
})(React.Component);
export { AngularUIView };
//# sourceMappingURL=AngularUIView.js.map
