import * as React from 'react';
import { IScope } from 'angular';
import { PortalView } from './PortalView';
interface IAngularUIViewProps {
    portalView?: PortalView;
    className?: string;
}
export interface IPortalScope extends IScope {
    $uiRouterReactHybridPortalView?: PortalView;
}
/**
 * A React component which renders an AngularJS <ui-view>
 * This was heavily influenced by https://github.com/coatue-oss/angular2react
 */
export declare class AngularUIView extends React.Component<IAngularUIViewProps> {
    private $scope;
    constructor(props: IAngularUIViewProps);
    componentWillUnmount(): void;
    render(): React.DOMElement<{
        class: string;
        ref: (htmlRef: Element) => any;
        portalView?: PortalView;
        children?: React.ReactNode;
    }, Element>;
    /** Only render once */
    shouldComponentUpdate(): boolean;
}
export {};
