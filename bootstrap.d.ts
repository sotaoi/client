import React from 'react';
import { StoreCreator } from '@sotaoi/contracts/definitions/redux';
import { AppKernel } from '@sotaoi/client/app-kernel';
import { AppInfoInterface } from '@sotaoi/contracts/state';
declare class Bootstrap {
    static init(appInfo: AppInfoInterface, apiUrl: string, appKernel: AppKernel, routerComponentFn: () => React.ReactElement, createStore: StoreCreator, Loading: React.FunctionComponent, ErrorComponent: React.FunctionComponent<{
        error: Error;
    }>, formNotifications: boolean, mpackages: {
        [key: string]: any;
    }): Promise<void>;
}
export { Bootstrap };
