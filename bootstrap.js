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
exports.Bootstrap = void 0;
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const store_service_1 = require("@sotaoi/client/services/store-service");
const socket_service_1 = require("@sotaoi/client/services/socket-service");
const control_panel_service_1 = require("@sotaoi/client/services/control-panel-service");
const helper_1 = require("@sotaoi/client/helper");
const store_1 = require("@sotaoi/client/store");
// import { socket } from '@sotaoi/client/socket';
const lang_1 = require("@sotaoi/client/lang");
const local_memory_service_1 = require("@sotaoi/client/services/local-memory-service");
const input_validator_service_1 = require("@sotaoi/forms/input-validator-service");
const logger_service_1 = require("@sotaoi/client/services/logger-service");
const lang_service_1 = require("@sotaoi/client/services/lang-service");
const notification_service_1 = require("@sotaoi/client/services/notification-service");
const router_1 = require("@sotaoi/client/router");
const base_form_1 = require("@sotaoi/client/forms/form-classes/base-form");
const mpackages_1 = require("@sotaoi/client/mpackages");
const asset_service_1 = require("@sotaoi/client/services/asset-service");
class Bootstrap {
    static init(appInfo, apiUrl, appKernel, routerComponentFn, createStore, Loading, ErrorComponent, formNotifications, mpackages) {
        return __awaiter(this, void 0, void 0, function* () {
            Object.entries(mpackages).map(([name, pkg]) => {
                mpackages_1.setPackage(name, pkg);
            });
            base_form_1.BaseForm.NOTIFY = formNotifications;
            appKernel.bootstrap((app) => {
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
                        const localMemory = app().get('app.system.localMemory');
                        return new store_service_1.StoreService(appInfo, apiUrl, createStore, inputValidator, localMemory);
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
                        return new notification_service_1.NotificationService(router_1.pushRoute);
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
            helper_1.Helper.setTitle(appInfo.name);
            const init = () => __awaiter(this, void 0, void 0, function* () {
                // socket().connect(`https://${appInfo.streamingDomain}:${appInfo.streamingPort}`, {
                //   transports: ['websocket'],
                // });
                yield store_1.store().init();
                yield lang_1.lang().init(store_1.store);
            });
            switch (true) {
                case helper_1.Helper.isWeb():
                    try {
                        react_dom_1.default.render(react_1.default.createElement(Loading, null), document.getElementById('bootstrap'));
                        yield init();
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
                    yield init();
                    break;
                case helper_1.Helper.isElectron():
                    // no loader here yet
                    yield init();
                    // nothing here yet
                    break;
                default:
                    throw new Error('Unknown environment');
            }
        });
    }
}
exports.Bootstrap = Bootstrap;
