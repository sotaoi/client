import React from 'react';
import { Helper } from '@sotaoi/client/helper';
import { RouteChange } from '@sotaoi/client/router/route-change';
import { LayoutProps, RouterConfig } from '@sotaoi/contracts/state';
import { Navigation } from '@sotaoi/client/router/navigation';
import { Store as ReduxStore } from 'redux';
// import { ReactReduxContextValue } from 'react-redux';
import { ErrorComponent } from '@sotaoi/client/services/control-panel-service/components/generic/error-component';
import { InstallLayout } from '@sotaoi/client/services/control-panel-service/components/install-layout/install-layout';
import { InstallForm } from '@sotaoi/client/services/control-panel-service/components/install-layout/forms/install-form';
import { ControlPanel } from '@sotaoi/contracts/http/control-panel-contract';
import { store } from '@sotaoi/client/store';
import { RouteComponent, ViewComponent } from '@sotaoi/client/components';

let WebComponent: any = null;
let MobileComponent: any = null;
let ElectronComponent: any = null;

type ExtendedComponent = (new (...args: any[]) => ViewComponent<any>) | (new (...args: any[]) => RouteComponent<any>);
type LayoutComponentMap = { [key: string]: React.FunctionComponent<LayoutProps> };

interface RouterProps {
  controlPanel: null | (() => ControlPanel);
  config: RouterConfig;
  extendedComponents: ExtendedComponent[];
  layoutComponents: LayoutComponentMap;
  errorComponent: React.FunctionComponent<{ error: Error }>;
  webComponent: any;
  mobileComponent: any;
  electronComponent: any;
  routerFlux: any;
  reactRedux: any;
  reduxStore?: ReduxStore<any, any>;
  // reduxProviderContext?: React.Context<ReactReduxContextValue>;
  reduxProviderContext?: React.Context<any>;
}

type RouterPropsFn = (
  extendedComponents: ExtendedComponent[],
  layoutComponents: LayoutComponentMap,
  opts: { [key: string]: any }
) => RouterProps;

const Router: React.FunctionComponent<RouterProps> = (props: RouterProps) => {
  Navigation.init(
    props.config,
    props.extendedComponents,
    props.layoutComponents,
    props.errorComponent,
    props.webComponent,
    props.mobileComponent,
    props.electronComponent,
    props.routerFlux,
    props.reactRedux,
    props.reduxStore || undefined,
    props.reduxProviderContext || undefined
  );
  RouteChange.replaceCurrentPath(RouteChange.getPathname());

  if (Helper.isWeb()) {
    WebComponent = props.webComponent;
  }
  if (Helper.isMobile()) {
    MobileComponent = props.mobileComponent;
  }
  if (Helper.isElectron()) {
    ElectronComponent = props.electronComponent;
  }

  if (!!WebComponent) {
    return <WebComponent />;
  }

  if (!!MobileComponent) {
    return <MobileComponent />;
  }

  if (!!ElectronComponent) {
    return <ElectronComponent />;
  }

  throw new Error('Something went wrong in router, unknown environment');
};

const pushRoute = (to: string, goTop = true): void => {
  return RouteChange.pushRoute(to, goTop);
};

const replaceRoute = (to: string, goTop = true): void => {
  return RouteChange.replaceRoute(to, goTop);
};

const redirect = (to: string): void => {
  RouteChange.redirect(to);
};

const routes =
  (controlPanelTriple: null | string, routerProps: RouterProps): RouterPropsFn =>
  (extendedComponents, layoutComponents, opts) => {
    const [controlPanelGateProp = null, controlPanelMainProp, controlPanelPrefix = null] = controlPanelTriple
      ? controlPanelTriple.split(':')
      : [];

    if (store().getAppInfo().bundleInstalled !== 'yes' && routerProps.controlPanel) {
      setTimeout(() => redirect('/'));
      return {
        controlPanel: routerProps.controlPanel,
        config: {
          install: {
            prefix: '/',
            layout: InstallLayout,
            routes: {
              '/': () => {
                return <InstallForm />;
              },
            },
            condition: () => true,
          },
        },
        extendedComponents,
        layoutComponents,
        errorComponent: ErrorComponent,
        webComponent: opts.webComponent,
        mobileComponent: opts.mobileComponent,
        electronComponent: opts.electronComponent,
        routerFlux: opts.routerFlux,
        reactRedux: opts.reactRedux,
      };
    }

    if (!routerProps.controlPanel || !controlPanelPrefix || !controlPanelGateProp || !controlPanelMainProp) {
      return routerProps;
    }

    routerProps.config[controlPanelGateProp] = routerProps.controlPanel().getRoutesConfigGate(controlPanelPrefix);
    routerProps.config[controlPanelMainProp] = routerProps.controlPanel().getRoutesConfigMain(controlPanelPrefix);
    routerProps.extendedComponents = extendedComponents;
    routerProps.layoutComponents = layoutComponents;
    routerProps.webComponent = opts.webComponent;
    routerProps.mobileComponent = opts.mobileComponent;
    routerProps.electronComponent = opts.electronComponent;
    routerProps.routerFlux = opts.routerFlux;
    routerProps.reactRedux = opts.reactRedux;

    return routerProps;
  };

export { Router, pushRoute, replaceRoute, redirect, routes };
export { Link } from '@sotaoi/client/router/link';
export type { RouterProps, RouterPropsFn, ExtendedComponent, LayoutComponentMap };
export type { LayoutProps } from '@sotaoi/contracts/state';
