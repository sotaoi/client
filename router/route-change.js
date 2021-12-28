"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteChange = void 0;
const helper_1 = require("@sotaoi/client/helper");
const router_events_1 = require("@sotaoi/client/router/router-events");
const navigation_1 = require("@sotaoi/client/router/navigation");
const store_1 = require("@sotaoi/client/store");
class RouteChange {
    static pushRoute(to, goTop = true) {
        this._setRoute(to, false, goTop);
    }
    static replaceRoute(to, goTop = true) {
        this._setRoute(to, true, goTop);
    }
    static redirect(to) {
        if (helper_1.Helper.isMobile()) {
            if (router_events_1.RouterEvents.isRedirecting()) {
                return;
            }
            router_events_1.RouterEvents.redirect(to);
            return;
        }
        router_events_1.RouterEvents.redirect(to);
        !router_events_1.RouterEvents.getIsRunningConditions() && this.executeRedirect();
    }
    static executeRedirect() {
        if (!router_events_1.RouterEvents.isRedirecting()) {
            console.warn('cannot execute redirect, no "redirectingTo"');
            router_events_1.RouterEvents.endRedirect();
            return;
        }
        const redirectTo = router_events_1.RouterEvents.getRedirectTo();
        if (!redirectTo) {
            console.warn('cannot get redirect to');
            router_events_1.RouterEvents.endRedirect();
            return;
        }
        router_events_1.RouterEvents.setExecuteRedirect();
        if (helper_1.Helper.isWeb()) {
            window.history.replaceState(null, '', redirectTo);
            this.goToTop();
            navigation_1.Navigation.refresh();
            return;
        }
        if (helper_1.Helper.isMobile()) {
            throw new Error('execute redirect - bad flow, this line should not have been reached');
        }
        throw new Error('execute redirect - unknown environment');
    }
    static goToTop() {
        switch (true) {
            case helper_1.Helper.isWeb():
                window.scrollTo({ top: 0 });
                break;
            case helper_1.Helper.isMobile():
                // nothing here yet
                break;
            case helper_1.Helper.isElectron():
                // nothing here yet
                break;
            default:
                throw new Error('Unknown environment');
        }
    }
    //
    static pushCurrentPath(newCurrentPath) {
        this.currentPath.push(newCurrentPath);
        this.currentPathHook();
    }
    static replaceCurrentPath(newCurrentPath) {
        if (!this.currentPath.length) {
            this.currentPath.push(newCurrentPath);
            this.currentPathHook();
            return;
        }
        this.currentPath[this.currentPath.length - 1] = newCurrentPath;
        this.currentPathHook();
    }
    static popCurrentPath() {
        const ok = this.currentPath.length > 1;
        ok && this.currentPath.pop();
        this.currentPathHook();
        return ok;
    }
    static getCurrentPath() {
        if (!this.currentPath.length) {
            throw new Error('current path should have length by now, but it does not');
        }
        return this.currentPath[this.currentPath.length - 1];
    }
    static pushRouteScheme(newRouteScheme) {
        this.routeScheme.push(newRouteScheme);
    }
    static replaceRouteScheme(newRouteScheme) {
        if (!this.routeScheme.length) {
            this.routeScheme.push(newRouteScheme);
            return;
        }
        this.routeScheme[this.routeScheme.length - 1] = newRouteScheme;
    }
    static popRouteScheme() {
        const ok = this.routeScheme.length > 1;
        ok && this.routeScheme.pop();
        return ok;
    }
    static getRouteScheme() {
        const result = this.routeScheme[this.routeScheme.length - 1];
        return typeof result !== 'undefined' ? result : null;
    }
    static getPrevRouteScheme() {
        const result = this.routeScheme[this.routeScheme.length - 2];
        return typeof result !== 'undefined' ? result : null;
    }
    //
    static currentPathHook() {
        store_1.store().setCurrentPath(this.getCurrentPath());
    }
    static _setRoute(to, replace, goTop) {
        var _a, _b;
        if (helper_1.Helper.isWeb()) {
            this.getCurrentPath() !== to && !replace
                ? window.history.pushState(null, '', to)
                : window.history.replaceState(null, '', to);
            goTop && this.goToTop();
            navigation_1.Navigation.refresh();
            return;
        }
        if (helper_1.Helper.isMobile()) {
            const prevRouteScheme = this.getRouteScheme();
            const [routeMatch, routes] = navigation_1.Navigation.getRouteMatch(to);
            if (!replace) {
                this.pushRouteScheme(routeMatch);
                this.pushCurrentPath(to);
                if (prevRouteScheme === routeMatch) {
                    navigation_1.Navigation.refresh();
                    return;
                }
                (_b = (_a = navigation_1.Navigation.routerFlux) === null || _a === void 0 ? void 0 : _a.Actions) === null || _b === void 0 ? void 0 : _b.push(routeMatch);
                return;
            }
            this.replaceRouteScheme(routeMatch);
            this.replaceCurrentPath(to);
            navigation_1.Navigation.refresh();
            return;
        }
        if (helper_1.Helper.isElectron()) {
            throw new Error('electron not implemented');
        }
        throw new Error('push route - unknown environment');
    }
    //
    static getPathname() {
        switch (true) {
            case helper_1.Helper.isWeb():
                return window.location.pathname + window.location.hash;
            case helper_1.Helper.isMobile():
                return store_1.store().getCurrentPath();
            case helper_1.Helper.isElectron():
                // nothing yet
                return '/';
            default:
                throw new Error('Unknown environment');
        }
    }
}
exports.RouteChange = RouteChange;
RouteChange.currentPath = [];
RouteChange.routeScheme = [];
