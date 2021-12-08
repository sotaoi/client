import React from 'react';
import ReactDom from 'react-dom';
import { StoreCreator } from '@sotaoi/contracts/definitions/redux';
import { StoreContract } from '@sotaoi/contracts/http/store-contract';
import { LocalMemoryContract } from '@sotaoi/contracts/http/local-memory-contract';
import { SocketContract } from '@sotaoi/contracts/http/socket-contract';
import { StoreService } from '@sotaoi/client/services/store-service';
import { SocketService } from '@sotaoi/client/services/socket-service';
import { ControlPanelService } from '@sotaoi/client/services/control-panel-service';
import { Helper } from '@sotaoi/client/helper';
import { AppKernel } from '@sotaoi/client/app-kernel';
import { store } from '@sotaoi/client/store';
import { AppInfoInterface } from '@sotaoi/contracts/state';
// import { socket } from '@sotaoi/client/socket';
import { lang } from '@sotaoi/client/lang';
import { LocalMemoryService } from '@sotaoi/client/services/local-memory-service';
import { InputValidatorService } from '@sotaoi/forms/input-validator-service';
import { LoggerContract } from '@sotaoi/contracts/http/logger-contract';
import { LoggerService } from '@sotaoi/client/services/logger-service';
import { LangContract } from '@sotaoi/contracts/http/lang-contract';
import { LangService } from '@sotaoi/client/services/lang-service';
import { InputValidatorContract } from '@sotaoi/contracts/http/input-validator-contract';
import { NotificationContract } from '@sotaoi/contracts/http/notification-contract';
import { NotificationService } from '@sotaoi/client/services/notification-service';
import { pushRoute } from '@sotaoi/client/router';
import { BaseForm } from '@sotaoi/client/forms/form-classes/base-form';
import { getPackage, setPackage } from '@sotaoi/client/mpackages';
import { AssetService } from '@sotaoi/client/services/asset-service';
import { SotaoiActionService } from './services/action-service';
import { ActionContract } from '@sotaoi/contracts/http/action-contract';
import { ControlPanelContract } from '@sotaoi/contracts/http/control-panel-contract';

class Bootstrap {
  public static async init(
    appInfo: AppInfoInterface,
    apiUrl: string,
    appKernel: AppKernel,
    routerComponentFn: () => React.ReactElement,
    createStore: StoreCreator,
    Loading: React.FunctionComponent,
    ErrorComponent: React.FunctionComponent<{ error: Error }>,
    formNotifications: boolean,
    mpackages: { [key: string]: any }
  ): Promise<void> {
    Object.entries(mpackages).map(([name, pkg]) => {
      setPackage(name, pkg);
    });

    BaseForm.NOTIFY = formNotifications;

    appKernel.bootstrap((app) => {
      // Action
      !app().has('app.system.action') &&
        app().singleton<ActionContract>('app.system.action', (): SotaoiActionService => {
          return new SotaoiActionService();
        });

      // Input Validator
      !app().has('app.system.inputValidator') &&
        // @ts-ignore
        app().singleton<InputValidator>('app.system.inputValidator', (): InputValidatorService => {
          return new InputValidatorService(
            {},
            () => null,
            () => Promise.resolve([])
          );
        });

      // Local Memory
      !app().has('app.system.localMemory') &&
        app().singleton<LocalMemoryContract>('app.system.localMemory', (): LocalMemoryService => {
          return new LocalMemoryService(['authRecord', 'currentPath'], getPackage('asyncStorage'));
        });

      // Logger
      !app().has('app.system.logger') &&
        app().singleton<LoggerContract>('app.system.logger', (): LoggerService => {
          return new LoggerService();
        });

      // Store
      !app().has('app.system.store') &&
        app().singleton<StoreContract>('app.system.store', (): StoreService => {
          const inputValidator = app().get<InputValidatorContract>('app.system.inputValidator');
          const localMemory = app().get<LocalMemoryContract>('app.system.localMemory');
          return new StoreService(appInfo, apiUrl, createStore, inputValidator, localMemory);
        });

      // Socket
      !app().has('app.system.socket') &&
        app().singleton<SocketContract>('app.system.socket', (): SocketService => {
          return new SocketService();
        });

      // Lang
      !app().has('app.system.lang') &&
        app().singleton<LangContract>('app.system.lang', (): LangService => {
          return new LangService();
        });

      // Notification
      !app().has('app.system.notification') &&
        app().singleton<NotificationContract>('app.system.notification', (): NotificationService => {
          return new NotificationService(pushRoute);
        });

      // Control Panel
      !app().has('app.system.controlPanel') &&
        app().singleton<ControlPanelContract>('app.system.controlPanel', (): ControlPanelService => {
          return new ControlPanelService();
        });

      // External Assets
      !app().has('app.system.assetService') &&
        app().singleton<AssetService>('app.system.assetService', (): AssetService => {
          return new AssetService(appInfo.assetServiceUrl, appInfo.bundleName, appInfo.bundleName, true);
        });
    });

    Helper.setTitle(appInfo.name);

    const init = async (): Promise<void> => {
      // socket().connect(`https://${appInfo.streamingDomain}:${appInfo.streamingPort}`, {
      //   transports: ['websocket'],
      // });
      await store().init();
      await lang().init(store);
    };

    switch (true) {
      case Helper.isWeb():
        try {
          ReactDom.render(<Loading />, document.getElementById('bootstrap'));
          await init();
          if (!!store().getState()['app.coreState.maintenance']) {
            ReactDom.render(
              <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                Service is currently unavailable, we are currently undergoing maintenance operations
              </div>,
              document.getElementById('bootstrap')
            );
            return;
          }
          ReactDom.render(routerComponentFn(), document.getElementById('bootstrap'));
        } catch (err: any) {
          console.error(err);
          ReactDom.render(<ErrorComponent error={err} />, document.getElementById('bootstrap'));
        }
        break;
      case Helper.isMobile():
        await init();
        break;
      case Helper.isElectron():
        // no loader here yet
        await init();
        // nothing here yet
        break;
      default:
        throw new Error('Unknown environment');
    }
  }
}

export { Bootstrap };
