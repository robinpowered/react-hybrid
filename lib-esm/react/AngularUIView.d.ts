import * as React from 'react';
/**
 * A React component which renders an AngularJS <ui-view>
 * This was heavily influenced by https://github.com/coatue-oss/angular2react
 */
export declare class AngularUIView extends React.Component<any, any> {
  constructor(props: any);
  render(): React.DOMElement<
    {
      class: any;
      ref: any;
      children?: React.ReactNode;
    },
    Element
  >;
  compile(ref: Element): void;
  componentWillUnmount(): void;
  /** Only render once */
  shouldComponentUpdate(): boolean;
}
