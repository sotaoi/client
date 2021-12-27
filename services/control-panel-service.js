"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlPanelService = void 0;
const react_1 = __importDefault(require("react"));
const control_panel_contract_1 = require("@sotaoi/contracts/http/control-panel-contract");
const helper_1 = require("@sotaoi/client/helper");
const store_1 = require("@sotaoi/client/store");
const gate_layout_1 = require("@sotaoi/client/services/control-panel-service/components/gate-layout/gate-layout");
const main_layout_1 = require("@sotaoi/client/services/control-panel-service/components/main-layout/main-layout");
const router_1 = require("@sotaoi/client/router");
const auth_maintainer_view_1 = require("@sotaoi/client/services/control-panel-service/components/gate-layout/views/maintainer/auth-maintainer-view");
class ControlPanelService extends control_panel_contract_1.ControlPanelContract {
    getRoutesConfigGate(prefix) {
        prefix = '/' + helper_1.Helper.trim('/', prefix) + '/gate';
        return {
            prefix,
            layout: gate_layout_1.GateLayout,
            routes: {
                '/': auth_maintainer_view_1.AuthMaintainerView,
            },
            condition: () => {
                const authRecord = store_1.store().getAuthRecord();
                if (authRecord && authRecord.domainSignature === store_1.store().sdriverDomainSignature()) {
                    return false;
                }
                return helper_1.Helper.isWeb();
            },
        };
    }
    getRoutesConfigMain(prefix) {
        prefix = '/' + helper_1.Helper.trim('/', prefix);
        return {
            prefix,
            layout: main_layout_1.MainLayout,
            routes: {
                '/': (props) => {
                    return react_1.default.createElement("div", null, "ok control panel");
                },
            },
            condition: () => {
                const authRecord = store_1.store().getAuthRecord();
                if (!authRecord || authRecord.domainSignature !== store_1.store().sdriverDomainSignature()) {
                    router_1.redirect(prefix + '/gate');
                    return false;
                }
                return helper_1.Helper.isWeb();
            },
        };
    }
}
exports.ControlPanelService = ControlPanelService;
