/// <reference types="react" />
import { UIViewProps } from '@uirouter/react';
export interface IReactUIViewProps extends UIViewProps {
    refFn: (ref: HTMLElement) => void;
}
export declare const ReactUIView: ({ refFn, ...props }: IReactUIViewProps) => JSX.Element;
