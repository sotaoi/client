"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.AppKernel = void 0;
const app_container_1 = require("@sotaoi/client/app-container");
let appContainer;
let app = () => appContainer;
exports.app = app;
class AppKernel {
    constructor(kernelInit = null) {
        this.bootstrapped = false;
        appContainer = new app_container_1.AppContainer();
        AppKernel.bootstrap(kernelInit);
        this.bootstrap();
    }
    bootstrap(registerFn) {
        if (!this.bootstrapped) {
            this.bootstrapped = true;
            AppKernel.bootstrap();
        }
        if (registerFn) {
            registerFn(app);
        }
    }
    static bootstrap(kernelInit = null) {
        kernelInit && kernelInit(app);
    }
}
exports.AppKernel = AppKernel;
