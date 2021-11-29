"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMaintainerRoute = void 0;
const react_1 = __importDefault(require("react"));
const components_1 = require("@sotaoi/client/components");
const auth_maintainer_view_1 = require("@sotaoi/client/services/control-panel-service/components/gate-layout/views/maintainer/auth-maintainer-view");
class AuthMaintainerRoute extends components_1.RouteComponent {
    display(props) {
        return react_1.default.createElement(auth_maintainer_view_1.AuthMaintainerView, null);
    }
    web(props) {
        return this.display(props);
    }
    mobile(props) {
        return null;
    }
    electron(props) {
        return null;
    }
}
exports.AuthMaintainerRoute = AuthMaintainerRoute;
