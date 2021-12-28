"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootstrapOptions = exports.Bootstrap = void 0;
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const store_service_1 = require("@sotaoi/client/services/store-service");
const socket_service_1 = require("@sotaoi/client/services/socket-service");
const control_panel_service_1 = require("@sotaoi/client/services/control-panel-service");
const helper_1 = require("@sotaoi/client/helper");
const store_1 = require("@sotaoi/client/store");
const socket_1 = require("@sotaoi/client/socket");
const lang_1 = require("@sotaoi/client/lang");
const local_memory_service_1 = require("@sotaoi/client/services/local-memory-service");
const input_validator_service_1 = require("@sotaoi/forms/input-validator-service");
const logger_service_1 = require("@sotaoi/client/services/logger-service");
const lang_service_1 = require("@sotaoi/client/services/lang-service");
const notification_service_1 = require("@sotaoi/client/services/notification-service");
const router_1 = require("@sotaoi/client/router");
const base_form_1 = require("@sotaoi/client-forms/form-classes/base-form");
const mpackages_1 = require("@sotaoi/client/mpackages");
const asset_service_1 = require("@sotaoi/client/services/asset-service");
const action_service_1 = require("@sotaoi/client/services/action-service");
const output_service_1 = require("@sotaoi/client/services/output-service");
const memory_1 = require("@sotaoi/client/memory");
const transactions_1 = require("@sotaoi/contracts/transactions");
const settings_service_1 = require("@sotaoi/client/services/settings-service");
const settings_1 = require("@sotaoi/client/settings");
class BootstrapOptions {
    constructor(disableSocket) {
        this.disableSocket = disableSocket;
    }
}
exports.BootstrapOptions = BootstrapOptions;
class Bootstrap {
    static options() {
        return new BootstrapOptions(false);
    }
    static prepare(appInfo, apiUrl, appKernel, routerComponentFn, createStore, Loading, ErrorComponent, formNotifications, mpackages, xdata) {
        return __awaiter(this, void 0, void 0, function* () {
            Object.entries(mpackages).map(([name, pkg]) => {
                mpackages_1.setPackage(name, pkg);
            });
            base_form_1.BaseForm.NOTIFY = formNotifications;
        });
    }
    static load(appInfo, apiUrl, appKernel, routerComponentFn, createStore, Loading, ErrorComponent, formNotifications, mpackages, xdata) {
        return __awaiter(this, void 0, void 0, function* () {
            appKernel.bootstrap((app) => {
                // Settings
                !app().has('app.system.settings') &&
                    app().singleton('app.system.settings', () => {
                        return new settings_service_1.SettingsService(this.options());
                    });
                // Output
                !app().has('app.system.output') &&
                    app().singleton('app.system.output', () => {
                        return new output_service_1.OutputService();
                    });
                // Action
                !app().has('app.system.action') &&
                    app().singleton('app.system.action', () => {
                        return new action_service_1.SotaoiActionService();
                    });
                // Input Validator
                !app().has('app.system.inputValidator') &&
                    app().singleton('app.system.inputValidator', () => {
                        return new input_validator_service_1.InputValidatorService({}, () => null, () => Promise.resolve([]));
                    });
                // Local Memory
                !app().has('app.system.localMemory') &&
                    app().singleton('app.system.localMemory', () => {
                        return new local_memory_service_1.LocalMemoryService(['authRecord', 'currentPath'], mpackages_1.getPackage('asyncStorage'));
                    });
                // Logger
                !app().has('app.system.logger') &&
                    app().singleton('app.system.logger', () => {
                        return new logger_service_1.LoggerService();
                    });
                // Store
                !app().has('app.system.store') &&
                    app().singleton('app.system.store', () => {
                        const inputValidator = app().get('app.system.inputValidator');
                        return new store_service_1.StoreService(appInfo, apiUrl, createStore, inputValidator, memory_1.memory());
                    });
                // Socket
                !app().has('app.system.socket') &&
                    app().singleton('app.system.socket', () => {
                        return new socket_service_1.SocketService();
                    });
                // Lang
                !app().has('app.system.lang') &&
                    app().singleton('app.system.lang', () => {
                        return new lang_service_1.LangService();
                    });
                // Notification
                !app().has('app.system.notification') &&
                    app().singleton('app.system.notification', () => {
                        return new notification_service_1.NotificationService(router_1.pushRoute, transactions_1.ActionConclusion);
                    });
                // Control Panel
                !app().has('app.system.controlPanel') &&
                    app().singleton('app.system.controlPanel', () => {
                        return new control_panel_service_1.ControlPanelService();
                    });
                // External Assets
                !app().has('app.system.assetService') &&
                    app().singleton('app.system.assetService', () => {
                        return new asset_service_1.AssetService(appInfo.assetServiceUrl, appInfo.bundleName, appInfo.bundleName, true);
                    });
            });
        });
    }
    static config(appInfo, apiUrl, appKernel, routerComponentFn, createStore, Loading, ErrorComponent, formNotifications, mpackages, xdata) {
        return __awaiter(this, void 0, void 0, function* () {
            helper_1.Helper.setTitle(appInfo.name);
        });
    }
    static setup(appInfo, apiUrl, appKernel, routerComponentFn, createStore, Loading, ErrorComponent, formNotifications, mpackages, xdata) {
        return __awaiter(this, void 0, void 0, function* () {
            this.renderAppRoutine = () => __awaiter(this, void 0, void 0, function* () {
                !settings_1.settings().bootstrapOptions.disableSocket &&
                    socket_1.socket().connect(`https://${appInfo.streamingDomain}:${appInfo.streamingPort}`, {
                        transports: ['websocket'],
                    });
                yield store_1.store().init();
                yield lang_1.lang().init(store_1.store);
            });
        });
    }
    static render(appInfo, apiUrl, appKernel, routerComponentFn, createStore, Loading, ErrorComponent, formNotifications, mpackages, xdata) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (true) {
                case helper_1.Helper.isWeb():
                    try {
                        react_dom_1.default.render(react_1.default.createElement(Loading, null), document.getElementById('bootstrap'));
                        yield this.renderAppRoutine();
                        if (!!store_1.store().getState()['app.coreState.maintenance']) {
                            react_dom_1.default.render(react_1.default.createElement("div", { style: { display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' } }, "Service is currently unavailable, we are currently undergoing maintenance operations"), document.getElementById('bootstrap'));
                            return;
                        }
                        react_dom_1.default.render(routerComponentFn(), document.getElementById('bootstrap'));
                    }
                    catch (err) {
                        console.error(err);
                        react_dom_1.default.render(react_1.default.createElement(ErrorComponent, { error: err }), document.getElementById('bootstrap'));
                    }
                    break;
                case helper_1.Helper.isMobile():
                    yield this.renderAppRoutine();
                    break;
                case helper_1.Helper.isElectron():
                    // no loader here yet
                    yield this.renderAppRoutine();
                    // nothing here yet
                    break;
                default:
                    throw new Error('Unknown environment');
            }
        });
    }
    static init(appInfo, apiUrl, appKernel, routerComponentFn, createStore, Loading, ErrorComponent, formNotifications, mpackages) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prepare(appInfo, apiUrl, appKernel, routerComponentFn, createStore, Loading, ErrorComponent, formNotifications, mpackages, {});
            yield this.load(appInfo, apiUrl, appKernel, routerComponentFn, createStore, Loading, ErrorComponent, formNotifications, mpackages, {});
            yield this.config(appInfo, apiUrl, appKernel, routerComponentFn, createStore, Loading, ErrorComponent, formNotifications, mpackages, {});
            yield this.setup(appInfo, apiUrl, appKernel, routerComponentFn, createStore, Loading, ErrorComponent, formNotifications, mpackages, {});
            yield this.render(appInfo, apiUrl, appKernel, routerComponentFn, createStore, Loading, ErrorComponent, formNotifications, mpackages, {});
        });
    }
}
exports.Bootstrap = Bootstrap;
Bootstrap.renderAppRoutine = () => __awaiter(void 0, void 0, void 0, function* () {
    //
});
