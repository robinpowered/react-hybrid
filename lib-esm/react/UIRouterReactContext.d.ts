import { UIRouterReact } from '@uirouter/react';
import * as React from 'react';
export interface IUIRouterContextComponentProps {
  parentContextLevel?: string;
}
export interface IUIRouterContextComponentState {
  ready: boolean;
  router?: UIRouterReact;
  parentUIViewAddress?: any;
}
/**
 * Provide react context necessary for UIView, UISref and UISrefActive
 *
 * Gets the context from the parent react UIView (if component tree is all react)
 * Gets the context from the from parent angular ui-view if no parent reat UIView is available
 */
export declare class UIRouterContextComponent extends React.Component<
  IUIRouterContextComponentProps,
  IUIRouterContextComponentState
> {
  static defaultProps: Partial<IUIRouterContextComponentProps>;
  state: IUIRouterContextComponentState;
  private ref;
  private injector;
  private getRouterFromAngularJS;
  private getParentViewFromAngularJS;
  componentDidMount(): void;
  private refCallback;
  private renderChild;
  render(): JSX.Element;
}
