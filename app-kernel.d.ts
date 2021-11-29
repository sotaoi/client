import { AppContainer } from '@sotaoi/client/app-container';
declare let app: () => AppContainer;
declare class AppKernel {
    bootstrapped: boolean;
    constructor();
    bootstrap(registerFn: void | ((app: () => AppContainer) => void)): void;
    protected static bootstrap(): void;
}
export { AppKernel, app };
