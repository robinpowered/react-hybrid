import { ReactNode } from 'react';
export interface IUIRouterContextComponentProps {
    parentContextLevel?: string;
    inherited?: boolean;
}
/**
 * Provide react context necessary for UIView, UISref and UISrefActive
 *
 * Gets the context from the parent react UIView (if component tree is all react)
 * Gets the context from the from parent angular ui-view if no parent reat UIView is available
 */
export declare function UIRouterContextComponent(props: {
    parentContextLevel: string;
    inherited: boolean;
    children: ReactNode;
}): JSX.Element;
export declare namespace UIRouterContextComponent {
    var defaultProps: IUIRouterContextComponentProps;
}
