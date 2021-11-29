"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreForm = void 0;
const store_form_component_1 = require("@sotaoi/client/forms/form-components/store-form-component");
const base_form_1 = require("@sotaoi/client/forms/form-classes/base-form");
class StoreForm extends base_form_1.BaseForm {
    constructor(formId, authRecord, artifacts, role, repository, fields, destroy) {
        super(formId, authRecord, artifacts, role, repository, fields, destroy);
        this.FormComponent = store_form_component_1.getStoreFormComponent(this);
        this.submit = () => {
            this.action('store');
        };
    }
}
exports.StoreForm = StoreForm;
