declare class RouteChange {
    protected static currentPath: string[];
    protected static routeScheme: string[];
    static pushRoute(to: string, goTop?: boolean): void;
    static replaceRoute(to: string, goTop?: boolean): void;
    static redirect(to: string): void;
    static executeRedirect(): void;
    static goToTop(): void;
    static pushCurrentPath(newCurrentPath: string): void;
    static replaceCurrentPath(newCurrentPath: string): void;
    static popCurrentPath(): boolean;
    static getCurrentPath(): string;
    static pushRouteScheme(newRouteScheme: string): void;
    static replaceRouteScheme(newRouteScheme: string): void;
    static popRouteScheme(): boolean;
    static getRouteScheme(): null | string;
    static getPrevRouteScheme(): null | string;
    static currentPathHook(): void;
    protected static _setRoute(to: string, replace: boolean, goTop: boolean): void;
    static getPathname(): string;
}
export { RouteChange };
