import * as React from 'react';
import { UIViewProps } from '@uirouter/react';
import { IReactUIViewProps } from './ReactUIView';
interface IPortalViewState {
  portals: {
    [key: number]: ChildUIView;
  };
}
export interface ChildUIView {
  childUIViewProps: IReactUIViewProps;
  portalTarget: HTMLElement;
}
/**
 * This react component renders the AngularUIView react component
 * and also creates React Portals as needed for child React UIViews.
 */
export declare class PortalView extends React.PureComponent<UIViewProps, IPortalViewState> {
  private $id;
  state: IPortalViewState;
  private debug;
  componentWillUnmount(): void;
  createPortalToChildUIView: (uiViewId: number, childUIView: ChildUIView) => void;
  removePortalToChildUIView: (uiViewId: number) => void;
  renderPortals(): JSX.Element[];
  render(): JSX.Element;
}
export {};
