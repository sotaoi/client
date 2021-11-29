"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = exports.routes = exports.redirect = exports.replaceRoute = exports.pushRoute = exports.Router = void 0;
const react_1 = __importDefault(require("react"));
const helper_1 = require("@sotaoi/client/helper");
const route_change_1 = require("@sotaoi/client/router/route-change");
const navigation_1 = require("@sotaoi/client/router/navigation");
// import { ReactReduxContextValue } from 'react-redux';
const error_component_1 = require("@sotaoi/client/services/control-panel-service/components/generic/error-component");
const install_layout_1 = require("@sotaoi/client/services/control-panel-service/components/install-layout/install-layout");
const install_form_1 = require("@sotaoi/client/services/control-panel-service/components/install-layout/forms/install-form");
const store_1 = require("@sotaoi/client/store");
let WebComponent = null;
let MobileComponent = null;
let ElectronComponent = null;
const Router = (props) => {
    navigation_1.Navigation.init(props.config, props.extendedComponents, props.layoutComponents, props.errorComponent, props.webComponent, props.mobileComponent, props.electronComponent, props.routerFlux, props.reactRedux, props.reduxStore || undefined, props.reduxProviderContext || undefined);
    route_change_1.RouteChange.replaceCurrentPath(route_change_1.RouteChange.getPathname());
    if (helper_1.Helper.isWeb()) {
        WebComponent = props.webComponent;
    }
    if (helper_1.Helper.isMobile()) {
        MobileComponent = props.mobileComponent;
    }
    if (helper_1.Helper.isElectron()) {
        ElectronComponent = props.electronComponent;
    }
    if (!!WebComponent) {
        return react_1.default.createElement(WebComponent, null);
    }
    if (!!MobileComponent) {
        return react_1.default.createElement(MobileComponent, null);
    }
    if (!!ElectronComponent) {
        return react_1.default.createElement(ElectronComponent, null);
    }
    throw new Error('Something went wrong in router, unknown environment');
};
exports.Router = Router;
const pushRoute = (to, goTop = true) => {
    return route_change_1.RouteChange.pushRoute(to, goTop);
};
exports.pushRoute = pushRoute;
const replaceRoute = (to, goTop = true) => {
    return route_change_1.RouteChange.replaceRoute(to, goTop);
};
exports.replaceRoute = replaceRoute;
const redirect = (to) => {
    route_change_1.RouteChange.redirect(to);
};
exports.redirect = redirect;
const routes = (controlPanelTriple, routerProps) => (extendedComponents, layoutComponents, opts) => {
    const [controlPanelGateProp = null, controlPanelMainProp, controlPanelPrefix = null] = controlPanelTriple
        ? controlPanelTriple.split(':')
        : [];
    if (store_1.store().getAppInfo().bundleInstalled !== 'yes' && routerProps.controlPanel) {
        setTimeout(() => redirect('/'));
        return {
            controlPanel: routerProps.controlPanel,
            config: {
                install: {
                    prefix: '/',
                    layout: install_layout_1.InstallLayout,
                    routes: {
                        '/': () => {
                            return react_1.default.createElement(install_form_1.InstallForm, null);
                        },
                    },
                    condition: () => true,
                },
            },
            extendedComponents,
            layoutComponents,
            errorComponent: error_component_1.ErrorComponent,
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
exports.routes = routes;
var link_1 = require("@sotaoi/client/router/link");
Object.defineProperty(exports, "Link", { enumerable: true, get: function () { return link_1.Link; } });
