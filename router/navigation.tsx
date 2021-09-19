import React from 'react';
import { LayoutProps, RenderComponent, RouterConfig } from '@sotaoi/omni/state';
import { Errors } from '@sotaoi/omni/errors';
import { RouterEvents } from '@sotaoi/client/router/router-events';
import { RouteChange } from '@sotaoi/client/router/route-change';
import { Helper } from '@sotaoi/client/helper';
import { store } from '@sotaoi/client/store';
import { Store as ReduxStore } from 'redux';
// import { ReactReduxContextValue } from 'react-redux';
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

class RouterData {
  public static config: null | RouterConfig = null;
  public static errorComponent: null | React.FunctionComponent<{ error: Error }> = null;
}

class Navigation {
  public static readonly NOT_FOUND_LAYOUT_SCHEME = '_@_{not-found-layout}-scheme';
  public static config: RouterConfig;
  public static extendedComponents: ExtendedComponent[];
  public static layoutComponents: LayoutComponentMap;
  public static ErrorComponent: React.FunctionComponent<{ error: Error }>;
  public static webComponent: () => null | React.ReactElement;
  public static mobileComponent: () => null | React.ReactElement;
  public static electronComponent: () => null | React.ReactElement;
  public static routerFlux: any;
  public static reactRedux: any;
  public static reduxStore: undefined | ReduxStore<any, any>;
  // public static reduxProviderContext: undefined | React.Context<ReactReduxContextValue>;
  public static reduxProviderContext: undefined | React.Context<any>;

  public static init(
    config: RouterConfig,
    extendedComponents: ExtendedComponent[],
    layoutComponents: LayoutComponentMap,
    ErrorComponent: React.FunctionComponent<{ error: Error }>,
    webComponent: () => null | React.ReactElement,
    mobileComponent: () => null | React.ReactElement,
    electronComponent: () => null | React.ReactElement,
    routerFlux: any,
    reactRedux: any,
    reduxStore?: ReduxStore<any, any>,
    // reduxProviderContext?: React.Context<ReactReduxContextValue>,
    reduxProviderContext?: React.Context<any>,
  ): void {
    this.config = config;
    this.extendedComponents = extendedComponents;
    this.layoutComponents = layoutComponents;
    this.ErrorComponent = ErrorComponent;
    this.webComponent = webComponent;
    this.mobileComponent = mobileComponent;
    this.electronComponent = electronComponent;
    this.routerFlux = routerFlux;
    this.reactRedux = reactRedux;
    this.reduxStore = reduxStore;
    this.reduxProviderContext = reduxProviderContext;
  }

  public static getNotFoundViewScheme(layoutName: string): string {
    return `_@_{not-found-view}-${layoutName}-scheme`;
  }

  public static getRouteMatch(path: string): [string, Routes] {
    if (!this.config || !this.ErrorComponent) {
      throw new Error('something went wrong - router is not properly initialized');
    }
    const routes = this.getRoutes(path, this.config, this.ErrorComponent);
    const routeMatch = routes.routeMatch
      ? routes.routeMatch
      : !routes.layoutMatch
      ? this.NOT_FOUND_LAYOUT_SCHEME
      : this.getNotFoundViewScheme(routes.layoutMatch);
    return [routeMatch, routes];
  }

  public static getRoutes(
    currentPath: string,
    config: RouterConfig,
    errorComponent: React.FunctionComponent<{ error: Error }>,
  ): Routes {
    RouterData.config = config;
    RouterData.errorComponent = errorComponent;

    const ErrorComponent = RouterData.errorComponent;
    const notFoundLayoutScheme = this.NOT_FOUND_LAYOUT_SCHEME;
    const NotFoundLayoutComponent = (): React.ReactElement => {
      return <ErrorComponent error={new Errors.NotFoundLayout()} />;
    };
    const routes: Routes = {
      routeMatch: null,
      layoutMatch: null,
      items: {
        [notFoundLayoutScheme]: {
          scheme: notFoundLayoutScheme,
          component: NotFoundLayoutComponent,
        },
      },
    };

    for (const [layoutName, layoutConfig] of Object.entries(RouterData.config)) {
      const notFoundViewScheme = this.getNotFoundViewScheme(layoutName);
      let Layout: React.FunctionComponent<LayoutProps>;
      if (typeof layoutConfig.layout !== 'string') {
        Layout = layoutConfig.layout;
      } else {
        if (!this.layoutComponents[layoutConfig.layout]) {
          continue;
        }
        Layout = this.layoutComponents[layoutConfig.layout];
      }
      const NotFoundViewComponent = (): React.ReactElement => {
        return (
          <Layout>
            <ErrorComponent error={new Errors.NotFoundView()} />
          </Layout>
        );
      };
      routes.items[notFoundViewScheme] = {
        scheme: notFoundViewScheme,
        component: NotFoundViewComponent,
      };
      for (let [routeScheme, _Component] of Object.entries(layoutConfig.routes)) {
        // this is becaused we allowed abstract classes in route definitions
        const Component: any = _Component;

        let ignorePrefix = false;
        [routeScheme, ignorePrefix] = this.parseRouteScheme(layoutName, layoutConfig.prefix, routeScheme);
        routes.items[routeScheme] = {
          scheme: routeScheme,
          component: (): React.ReactElement => {
            const state = store().getState();
            const params = this.getParams();
            return (
              <Layout>
                <Component state={state} params={params} />
              </Layout>
            );
          },
        };

        if (routes.routeMatch) {
          break;
        }

        const layoutPrefixTrimmed = Helper.trim('/', layoutConfig.prefix || '');
        const currentPathTrimmed = Helper.trim('/', currentPath || '');
        const matchesLayoutPrefix = currentPathTrimmed.substr(0, layoutPrefixTrimmed.length) === layoutPrefixTrimmed;
        if (!ignorePrefix && !matchesLayoutPrefix) {
          continue;
        }

        if (!this.isMatch(layoutName, currentPath, routeScheme)) {
          continue;
        }

        if (!layoutConfig.condition()) {
          continue;
        }

        routes.layoutMatch = layoutName;
        routes.routeMatch = routeScheme;
      }
    }

    routes.routeMatch && RouterEvents.endRedirect();

    return routes;
  }

  public static isMatch(layoutName: string, uri: string, routeScheme: string): boolean {
    uri = layoutName + '-' + uri;
    if (uri + '/' === routeScheme) {
      return true;
    }

    let argMatches: null | RegExpMatchArray;

    uri = uri.split('#')[0];

    try {
      argMatches = routeScheme.match(/{[^({}).]+}/g);
    } catch (err) {
      return false;
    }
    const args = argMatches ? argMatches.map((routeScheme) => routeScheme.replace(/[{}]/g, '')) : [];

    let regex = `^${routeScheme}$`;
    args.map((arg) => {
      // this below is cool. route example: "/Items/NewsMessages(/{displayArea})?(/{remainingUri})??"
      // this will result in params like: {displayArea: "tariffAreaOrWhatever", remainingUri: "lang/en/exclusive/true/any/other/params"}
      // so "??" in the end can put everything else in a param
      // similar to the "exact=true/false" strategy on classic react routers
      regex = regex.replace(`(/{${arg}})??`, '(/(.+))?');

      regex = regex.replace(`(/{${arg}})?`, '(/([^/]+))?');
      regex = regex.replace(`{${arg}}`, '([^/]+)');
    });

    let match: null | RegExpMatchArray;
    try {
      match = uri.match(regex);
    } catch (err) {
      return false;
    }
    return !!match;
  }

  public static parseRouteScheme(layoutName: string, prefix: string, routeScheme: string): [string, boolean] {
    const ignorePrefix = routeScheme.charAt(0) === '!' && !!(routeScheme = routeScheme.substr(1));
    prefix.charAt(0) !== '/' && (prefix = `/${prefix}`);
    routeScheme.charAt(0) !== '/' && (routeScheme = `/${routeScheme}`);
    routeScheme = ignorePrefix ? routeScheme : prefix + routeScheme;
    // todo lowprio: fix this
    routeScheme.charAt(0) === '/' && routeScheme.charAt(1) === '/' && (routeScheme = routeScheme.substr(1));
    return [layoutName + '-' + routeScheme, !!ignorePrefix];
  }

  public static refresh(): void {
    if (Helper.isWeb()) {
      RouterEvents.fire('router-refresh');
      return;
    }
    if (Helper.isMobile()) {
      this.getRouteMatch(RouteChange.getCurrentPath());
      RouterEvents.fire('router-refresh');
      return;
    }
    if (Helper.isElectron()) {
      throw new Error('router navigation error: electron is not implemented');
    }
    throw new Error('router navigation error: unknown environment');
  }

  public static getParams<ParamsType extends { [key: string]: any }>(): ParamsType {
    let argMatches: null | RegExpMatchArray;
    let currentPath = RouteChange.getCurrentPath();
    const routeScheme = RouteChange.getRouteScheme();
    if (!routeScheme) {
      return {} as ParamsType;
    }
    const layoutName = routeScheme.split('-')[0];
    currentPath = `${layoutName}-${currentPath}`;

    try {
      argMatches = routeScheme.match(/{[^({}).]+}/g);
    } catch (err) {
      return {} as ParamsType;
    }
    const args = argMatches ? argMatches.map((routeScheme) => routeScheme.replace(/[{}]/g, '')) : [];

    let regex = `^${routeScheme}$`;
    args.map((arg) => {
      regex = regex.replace(`(/{${arg}})??`, '(/(.+))?');
      regex = regex.replace(`(/{${arg}})?`, '(/([^/]+))?');
      regex = regex.replace(`{${arg}}`, '([^/]+)');
    });

    const params: { [key: string]: any } = {};

    let index = -1;
    const result: string[] = [];
    let match: null | RegExpMatchArray;
    try {
      match = currentPath.match(regex);
    } catch (err) {
      return {} as ParamsType;
    }
    match &&
      match.map((match) => {
        index++;
        if (index > 0 && match && match[0] !== '/') {
          result.push(match);
        }
      });

    index = -1;
    for (const item of args) {
      index++;
      params[item] = result && result[index] ? result[index] : null;
    }

    return (params || {}) as ParamsType;
  }
}

export { Navigation };
export type { Routes };
