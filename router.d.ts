import React from 'react';
import { LayoutProps, RouterConfig } from '@sotaoi/contracts/state';
import { Store as ReduxStore } from 'redux';
import { ControlPanel } from '@sotaoi/contracts/http/control-panel-contract';
import { RouteComponent, ViewComponent } from '@sotaoi/client/components';
declare type ExtendedComponent = (new (...args: any[]) => ViewComponent<any>) | (new (...args: any[]) => RouteComponent<any>);
declare type LayoutComponentMap = {
    [key: string]: React.FunctionComponent<LayoutProps>;
};
interface RouterProps {
    controlPanel: null | (() => ControlPanel);
    config: RouterConfig;
    extendedComponents: ExtendedComponent[];
    layoutComponents: LayoutComponentMap;
    errorComponent: React.FunctionComponent<{
        error: Error;
    }>;
    webComponent: any;
    mobileComponent: any;
    electronComponent: any;
    routerFlux: any;
    reactRedux: any;
    reduxStore?: ReduxStore<any, any>;
    reduxProviderContext?: React.Context<any>;
}
declare type RouterPropsFn = (extendedComponents: ExtendedComponent[], layoutComponents: LayoutComponentMap, opts: {
    [key: string]: any;
}) => RouterProps;
declare const Router: React.FunctionComponent<RouterProps>;
declare const pushRoute: (to: string, goTop?: boolean) => void;
declare const replaceRoute: (to: string, goTop?: boolean) => void;
declare const redirect: (to: string) => void;
declare const routes: (controlPanelTriple: null | string, routerProps: RouterProps) => RouterPropsFn;
export { Router, pushRoute, replaceRoute, redirect, routes };
export { Link } from '@sotaoi/client/router/link';
export type { RouterProps, RouterPropsFn, ExtendedComponent, LayoutComponentMap };
export type { LayoutProps } from '@sotaoi/contracts/state';
