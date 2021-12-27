"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateForm = void 0;
const update_form_component_1 = require("@sotaoi/client-forms/form-components/update-form-component");
const base_form_1 = require("@sotaoi/client-forms/form-classes/base-form");
class UpdateForm extends base_form_1.BaseForm {
    constructor(formId, authRecord, artifacts, role, repository, fields, uuid, destroy) {
        super(formId, authRecord, artifacts, role, repository, fields, destroy);
        this.uuid = uuid;
        this.FormComponent = update_form_component_1.getUpdateFormComponent(this);
        this.submit = () => {
            this.action('update');
        };
    }
}
exports.UpdateForm = UpdateForm;
