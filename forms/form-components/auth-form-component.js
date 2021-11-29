"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthFormComponent = void 0;
const react_1 = __importDefault(require("react"));
const helper_1 = require("@sotaoi/client/helper");
const getAuthFormComponent = (form) => (props) => (react_1.default.createElement(AuthFormComponent, { form: form, formStyle: props.formStyle || {}, showFormElement: !props.noFormElement }, props.children));
exports.getAuthFormComponent = getAuthFormComponent;
const AuthFormComponent = (props) => {
    switch (true) {
        case helper_1.Helper.isWeb():
            if (!props.showFormElement) {
                return props.children;
            }
            return (react_1.default.createElement("form", { action: '/', method: 'POST', onSubmit: (ev) => {
                    ev.preventDefault();
                    props.form.getFormState().canSubmit && props.form.action('auth');
                    return false;
                }, style: props.formStyle }, props.children));
        case helper_1.Helper.isMobile():
            return react_1.default.createElement(react_1.default.Fragment, null, props.children);
        case helper_1.Helper.isElectron():
            return react_1.default.createElement(react_1.default.Fragment, null, props.children);
        default:
            throw new Error('Unknown environment');
    }
};
