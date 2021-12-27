"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaintainerFormValidations = void 0;
const control_panel_forms_1 = require("@sotaoi/client/services/control-panel-service/control-panel-forms");
const getMaintainerFormValidations = () => {
    return (props, requestAbortHandler) => control_panel_forms_1.controlPanelForms['auth-maintainer-form']();
};
exports.getMaintainerFormValidations = getMaintainerFormValidations;
