import { AppContainer } from '@sotaoi/client/app-container';

let appContainer: AppContainer;
let app: () => AppContainer = () => appContainer;

class AppKernel {
  public bootstrapped: boolean;

  constructor(kernelInit: null | ((app: () => AppContainer) => void) = null) {
    this.bootstrapped = false;
    appContainer = new AppContainer();
    AppKernel.bootstrap(kernelInit);
    this.bootstrap();
  }

  public bootstrap(registerFn: void | ((app: () => AppContainer) => void)): void {
    if (!this.bootstrapped) {
      this.bootstrapped = true;
      AppKernel.bootstrap();
    }
    if (registerFn) {
      registerFn(app);
    }
  }

  protected static bootstrap(kernelInit: null | ((app: () => AppContainer) => void) = null): void {
    kernelInit && kernelInit(app);
  }
}

export { AppKernel, app };
