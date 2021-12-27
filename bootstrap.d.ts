import React from 'react';
import { StoreCreator } from '@sotaoi/contracts/definitions/redux';
import { AppKernel } from '@sotaoi/client/app-kernel';
import { AppInfoInterface } from '@sotaoi/contracts/state';
declare class Bootstrap {
    protected static renderAppRoutine: () => Promise<void>;
    protected static prepare(appInfo: AppInfoInterface, apiUrl: string, appKernel: AppKernel, routerComponentFn: () => React.ReactElement, createStore: StoreCreator, Loading: React.FunctionComponent, ErrorComponent: React.FunctionComponent<{
        error: Error;
    }>, formNotifications: boolean, mpackages: {
        [key: string]: any;
    }, xdata: {
        [key: string]: any;
    }): Promise<void>;
    protected static load(appInfo: AppInfoInterface, apiUrl: string, appKernel: AppKernel, routerComponentFn: () => React.ReactElement, createStore: StoreCreator, Loading: React.FunctionComponent, ErrorComponent: React.FunctionComponent<{
        error: Error;
    }>, formNotifications: boolean, mpackages: {
        [key: string]: any;
    }, xdata: {
        [key: string]: any;
    }): Promise<void>;
    protected static config(appInfo: AppInfoInterface, apiUrl: string, appKernel: AppKernel, routerComponentFn: () => React.ReactElement, createStore: StoreCreator, Loading: React.FunctionComponent, ErrorComponent: React.FunctionComponent<{
        error: Error;
    }>, formNotifications: boolean, mpackages: {
        [key: string]: any;
    }, xdata: {
        [key: string]: any;
    }): Promise<void>;
    protected static setup(appInfo: AppInfoInterface, apiUrl: string, appKernel: AppKernel, routerComponentFn: () => React.ReactElement, createStore: StoreCreator, Loading: React.FunctionComponent, ErrorComponent: React.FunctionComponent<{
        error: Error;
    }>, formNotifications: boolean, mpackages: {
        [key: string]: any;
    }, xdata: {
        [key: string]: any;
    }): Promise<void>;
    protected static render(appInfo: AppInfoInterface, apiUrl: string, appKernel: AppKernel, routerComponentFn: () => React.ReactElement, createStore: StoreCreator, Loading: React.FunctionComponent, ErrorComponent: React.FunctionComponent<{
        error: Error;
    }>, formNotifications: boolean, mpackages: {
        [key: string]: any;
    }, xdata: {
        [key: string]: any;
    }): Promise<void>;
    static init(appInfo: AppInfoInterface, apiUrl: string, appKernel: AppKernel, routerComponentFn: () => React.ReactElement, createStore: StoreCreator, Loading: React.FunctionComponent, ErrorComponent: React.FunctionComponent<{
        error: Error;
    }>, formNotifications: boolean, mpackages: {
        [key: string]: any;
    }): Promise<void>;
}
export { Bootstrap };
