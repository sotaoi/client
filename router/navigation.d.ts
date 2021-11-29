import React from 'react';
import { RenderComponent, RouterConfig } from '@sotaoi/contracts/state';
import { Store as ReduxStore } from 'redux';
import { ExtendedComponent, LayoutComponentMap } from '@sotaoi/client/router';
interface Routes {
    routeMatch: null | string;
    layoutMatch: null | string;
    items: {
        [key: string]: {
            scheme: string;
            component: RenderComponent;
        };
    };
}
declare class Navigation {
    static readonly NOT_FOUND_LAYOUT_SCHEME = "_@_{not-found-layout}-scheme";
    static config: RouterConfig;
    static extendedComponents: ExtendedComponent[];
    static layoutComponents: LayoutComponentMap;
    static ErrorComponent: React.FunctionComponent<{
        error: Error;
    }>;
    static webComponent: () => null | React.ReactElement;
    static mobileComponent: () => null | React.ReactElement;
    static electronComponent: () => null | React.ReactElement;
    static routerFlux: any;
    static reactRedux: any;
    static reduxStore: undefined | ReduxStore<any, any>;
    static reduxProviderContext: undefined | React.Context<any>;
    static init(config: RouterConfig, extendedComponents: ExtendedComponent[], layoutComponents: LayoutComponentMap, ErrorComponent: React.FunctionComponent<{
        error: Error;
    }>, webComponent: () => null | React.ReactElement, mobileComponent: () => null | React.ReactElement, electronComponent: () => null | React.ReactElement, routerFlux: any, reactRedux: any, reduxStore?: ReduxStore<any, any>, reduxProviderContext?: React.Context<any>): void;
    static getNotFoundViewScheme(layoutName: string): string;
    static getRouteMatch(path: string): [string, Routes];
    static getRoutes(currentPath: string, config: RouterConfig, errorComponent: React.FunctionComponent<{
        error: Error;
    }>): Routes;
    static isMatch(layoutName: string, uri: string, routeScheme: string): boolean;
    static parseRouteScheme(layoutName: string, prefix: string, routeScheme: string): [string, boolean];
    static refresh(): void;
    static getParams<ParamsType extends {
        [key: string]: any;
    }>(): ParamsType;
}
export { Navigation };
export type { Routes };
