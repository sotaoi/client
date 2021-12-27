"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskForm = void 0;
const task_form_component_1 = require("@sotaoi/client-forms/form-components/task-form-component");
const base_form_1 = require("@sotaoi/client-forms/form-classes/base-form");
class TaskForm extends base_form_1.BaseForm {
    constructor(formId, authRecord, artifacts, role, repository, task, fields, destroy) {
        super(formId, authRecord, artifacts, role, repository, fields, destroy);
        this.task = task;
        this.FormComponent = task_form_component_1.getTaskFormComponent(this);
        this.submit = () => {
            this.action('task');
        };
    }
}
exports.TaskForm = TaskForm;
