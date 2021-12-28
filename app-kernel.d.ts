import { AppContainer } from '@sotaoi/client/app-container';
declare let app: () => AppContainer;
declare class AppKernel {
    bootstrapped: boolean;
    constructor(kernelInit?: null | ((app: () => AppContainer) => void));
    bootstrap(registerFn: void | ((app: () => AppContainer) => void)): void;
    protected static bootstrap(kernelInit?: null | ((app: () => AppContainer) => void)): void;
}
export { AppKernel, app };
