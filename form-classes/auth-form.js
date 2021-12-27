"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthForm = void 0;
const auth_form_component_1 = require("@sotaoi/client-forms/form-components/auth-form-component");
const base_form_1 = require("@sotaoi/client-forms/form-classes/base-form");
class AuthForm extends base_form_1.BaseForm {
    constructor(formId, artifacts, repository, fields, strategy, destroy) {
        super(formId, null, artifacts, null, repository, fields, destroy);
        this.strategy = strategy;
        this.FormComponent = auth_form_component_1.getAuthFormComponent(this);
        this.submit = () => {
            this.action('auth');
        };
    }
}
exports.AuthForm = AuthForm;
