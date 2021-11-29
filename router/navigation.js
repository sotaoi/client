"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navigation = void 0;
const react_1 = __importDefault(require("react"));
const errors_1 = require("@sotaoi/contracts/errors");
const router_events_1 = require("@sotaoi/client/router/router-events");
const route_change_1 = require("@sotaoi/client/router/route-change");
const helper_1 = require("@sotaoi/client/helper");
const store_1 = require("@sotaoi/client/store");
class RouterData {
}
RouterData.config = null;
RouterData.errorComponent = null;
class Navigation {
    static init(config, extendedComponents, layoutComponents, ErrorComponent, webComponent, mobileComponent, electronComponent, routerFlux, reactRedux, reduxStore, 
    // reduxProviderContext?: React.Context<ReactReduxContextValue>,
    reduxProviderContext) {
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
    static getNotFoundViewScheme(layoutName) {
        return `_@_{not-found-view}-${layoutName}-scheme`;
    }
    static getRouteMatch(path) {
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
    static getRoutes(currentPath, config, errorComponent) {
        RouterData.config = config;
        RouterData.errorComponent = errorComponent;
        const ErrorComponent = RouterData.errorComponent;
        const notFoundLayoutScheme = this.NOT_FOUND_LAYOUT_SCHEME;
        const NotFoundLayoutComponent = () => {
            return react_1.default.createElement(ErrorComponent, { error: new errors_1.Errors.NotFoundLayout() });
        };
        const routes = {
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
            let Layout;
            if (typeof layoutConfig.layout !== 'string') {
                Layout = layoutConfig.layout;
            }
            else {
                if (!this.layoutComponents[layoutConfig.layout]) {
                    continue;
                }
                Layout = this.layoutComponents[layoutConfig.layout];
            }
            const NotFoundViewComponent = () => {
                return (react_1.default.createElement(Layout, null,
                    react_1.default.createElement(ErrorComponent, { error: new errors_1.Errors.NotFoundView() })));
            };
            routes.items[notFoundViewScheme] = {
                scheme: notFoundViewScheme,
                component: NotFoundViewComponent,
            };
            for (let [routeScheme, _Component] of Object.entries(layoutConfig.routes)) {
                // this is becaused we allowed abstract classes in route definitions
                const Component = _Component;
                let ignorePrefix = false;
                [routeScheme, ignorePrefix] = this.parseRouteScheme(layoutName, layoutConfig.prefix, routeScheme);
                routes.items[routeScheme] = {
                    scheme: routeScheme,
                    component: () => {
                        const state = store_1.store().getState();
                        const params = this.getParams();
                        return (react_1.default.createElement(Layout, null,
                            react_1.default.createElement(Component, { state: state, params: params })));
                    },
                };
                if (routes.routeMatch) {
                    break;
                }
                const layoutPrefixTrimmed = helper_1.Helper.trim('/', layoutConfig.prefix || '');
                const currentPathTrimmed = helper_1.Helper.trim('/', currentPath || '');
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
        routes.routeMatch && router_events_1.RouterEvents.endRedirect();
        return routes;
    }
    static isMatch(layoutName, uri, routeScheme) {
        uri = layoutName + '-' + uri;
        if (uri + '/' === routeScheme) {
            return true;
        }
        let argMatches;
        uri = uri.split('#')[0];
        try {
            argMatches = routeScheme.match(/{[^({}).]+}/g);
        }
        catch (err) {
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
        let match;
        try {
            match = uri.match(regex);
        }
        catch (err) {
            return false;
        }
        return !!match;
    }
    static parseRouteScheme(layoutName, prefix, routeScheme) {
        const ignorePrefix = routeScheme.charAt(0) === '!' && !!(routeScheme = routeScheme.substr(1));
        prefix.charAt(0) !== '/' && (prefix = `/${prefix}`);
        routeScheme.charAt(0) !== '/' && (routeScheme = `/${routeScheme}`);
        routeScheme = ignorePrefix ? routeScheme : prefix + routeScheme;
        // todo lowprio: fix this
        routeScheme.charAt(0) === '/' && routeScheme.charAt(1) === '/' && (routeScheme = routeScheme.substr(1));
        return [layoutName + '-' + routeScheme, !!ignorePrefix];
    }
    static refresh() {
        if (helper_1.Helper.isWeb()) {
            router_events_1.RouterEvents.fire('router-refresh');
            return;
        }
        if (helper_1.Helper.isMobile()) {
            this.getRouteMatch(route_change_1.RouteChange.getCurrentPath());
            router_events_1.RouterEvents.fire('router-refresh');
            return;
        }
        if (helper_1.Helper.isElectron()) {
            throw new Error('router navigation error: electron is not implemented');
        }
        throw new Error('router navigation error: unknown environment');
    }
    static getParams() {
        let argMatches;
        let currentPath = route_change_1.RouteChange.getCurrentPath();
        const routeScheme = route_change_1.RouteChange.getRouteScheme();
        if (!routeScheme) {
            return {};
        }
        const layoutName = routeScheme.split('-')[0];
        currentPath = `${layoutName}-${currentPath}`;
        try {
            argMatches = routeScheme.match(/{[^({}).]+}/g);
        }
        catch (err) {
            return {};
        }
        const args = argMatches ? argMatches.map((routeScheme) => routeScheme.replace(/[{}]/g, '')) : [];
        let regex = `^${routeScheme}$`;
        args.map((arg) => {
            regex = regex.replace(`(/{${arg}})??`, '(/(.+))?');
            regex = regex.replace(`(/{${arg}})?`, '(/([^/]+))?');
            regex = regex.replace(`{${arg}}`, '([^/]+)');
        });
        const params = {};
        let index = -1;
        const result = [];
        let match;
        try {
            match = currentPath.match(regex);
        }
        catch (err) {
            return {};
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
        return (params || {});
    }
}
exports.Navigation = Navigation;
Navigation.NOT_FOUND_LAYOUT_SCHEME = '_@_{not-found-layout}-scheme';
