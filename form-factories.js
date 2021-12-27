"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormConstructor = exports.TaskFormFactory = exports.AuthFormFactory = exports.UpdateFormFactory = exports.StoreFormFactory = void 0;
const store_form_1 = require("@sotaoi/client-forms/form-classes/store-form");
const update_form_1 = require("@sotaoi/client-forms/form-classes/update-form");
const auth_form_1 = require("@sotaoi/client-forms/form-classes/auth-form");
const base_form_1 = require("@sotaoi/client-forms/form-classes/base-form");
const helper_1 = require("@sotaoi/client/helper");
const lodash_1 = __importDefault(require("lodash"));
const task_form_1 = require("@sotaoi/client-forms/form-classes/task-form");
const StoreFormFactory = (authRecord, artifacts, role, repository, fields) => {
    let formId;
    const formSerial = JSON.stringify({
        type: 'store',
        authRecord,
        artifacts,
        role,
        repository,
        fieldTypes: Object.entries(fields.constructors).reduce((result, [key, field], index) => {
            result[key] = field.type;
            return result;
        }, {}),
        fieldValidations: fields.validations,
    });
    const formSerialIndex = Object.values(base_form_1.BaseForm.formSerials).indexOf(formSerial);
    if (formSerialIndex === -1) {
        formId = helper_1.Helper.uuid();
        base_form_1.BaseForm.formSerials[formId] = formSerial;
    }
    else {
        formId = Object.keys(base_form_1.BaseForm.formSerials)[formSerialIndex];
    }
    if (base_form_1.BaseForm.instances[formId]) {
        if (!(base_form_1.BaseForm.instances[formId] instanceof store_form_1.StoreForm)) {
            throw new Error('Something went wrong');
        }
        if (JSON.stringify(fields) !== base_form_1.BaseForm.instances[formId].serializedDescriptors) {
            base_form_1.BaseForm.instances[formId].resetFieldDescriptors(fields);
            base_form_1.BaseForm.instances[formId].rerender(true);
        }
        return base_form_1.BaseForm.instances[formId];
    }
    const storeForm = new store_form_1.StoreForm(formId, authRecord, artifacts, role, repository, fields, () => {
        delete base_form_1.BaseForm.instances[formId];
        // delete BaseForm.formSerials[formId];
    });
    base_form_1.BaseForm.instances[formId] = storeForm;
    return storeForm;
};
exports.StoreFormFactory = StoreFormFactory;
const UpdateFormFactory = (authRecord, artifacts, role, repository, fields, uuid) => {
    let formId;
    const formSerial = JSON.stringify({
        type: 'update',
        authRecord,
        artifacts,
        role,
        repository,
        fieldConstructors: Object.keys(fields.constructors),
        fieldValidations: fields.validations,
        uuid,
    });
    const formSerialIndex = Object.values(base_form_1.BaseForm.formSerials).indexOf(formSerial);
    if (formSerialIndex === -1) {
        formId = helper_1.Helper.uuid();
        base_form_1.BaseForm.formSerials[formId] = formSerial;
    }
    else {
        formId = Object.keys(base_form_1.BaseForm.formSerials)[formSerialIndex];
    }
    if (base_form_1.BaseForm.instances[formId]) {
        if (!(base_form_1.BaseForm.instances[formId] instanceof update_form_1.UpdateForm)) {
            throw new Error('Something went wrong');
        }
        if (JSON.stringify(fields) !== base_form_1.BaseForm.instances[formId].serializedDescriptors) {
            base_form_1.BaseForm.instances[formId].resetFieldDescriptors(fields);
            base_form_1.BaseForm.instances[formId].rerender(true);
        }
        return base_form_1.BaseForm.instances[formId];
    }
    const updateForm = new update_form_1.UpdateForm(formId, authRecord, artifacts, role, repository, fields, uuid, () => {
        delete base_form_1.BaseForm.instances[formId];
        // delete BaseForm.formSerials[formId];
    });
    base_form_1.BaseForm.instances[formId] = updateForm;
    return updateForm;
};
exports.UpdateFormFactory = UpdateFormFactory;
const AuthFormFactory = (artifacts, repository, fields, strategy) => {
    let formId;
    const formSerial = JSON.stringify({
        type: 'auth',
        artifacts,
        repository,
        fieldConstructors: Object.keys(fields.constructors),
        fieldValidations: fields.validations,
        strategy,
    });
    const formSerialIndex = Object.values(base_form_1.BaseForm.formSerials).indexOf(formSerial);
    if (formSerialIndex === -1) {
        formId = helper_1.Helper.uuid();
        base_form_1.BaseForm.formSerials[formId] = formSerial;
    }
    else {
        formId = Object.keys(base_form_1.BaseForm.formSerials)[formSerialIndex];
    }
    if (base_form_1.BaseForm.instances[formId]) {
        if (!(base_form_1.BaseForm.instances[formId] instanceof auth_form_1.AuthForm)) {
            throw new Error('Something went wrong');
        }
        if (JSON.stringify(fields) !== base_form_1.BaseForm.instances[formId].serializedDescriptors) {
            base_form_1.BaseForm.instances[formId].resetFieldDescriptors(fields);
            base_form_1.BaseForm.instances[formId].rerender(true);
        }
        return base_form_1.BaseForm.instances[formId];
    }
    const authForm = new auth_form_1.AuthForm(formId, artifacts, repository, fields, strategy, () => {
        delete base_form_1.BaseForm.instances[formId];
        // delete BaseForm.formSerials[formId];
    });
    base_form_1.BaseForm.instances[formId] = authForm;
    return authForm;
};
exports.AuthFormFactory = AuthFormFactory;
const TaskFormFactory = (authRecord, artifacts, role, repository, task, fields) => {
    let formId;
    const formSerial = JSON.stringify({
        type: 'task',
        authRecord,
        artifacts,
        role,
        repository,
        task,
        fieldConstructors: Object.keys(fields.constructors),
        fieldValidations: fields.validations,
    });
    const formSerialIndex = Object.values(base_form_1.BaseForm.formSerials).indexOf(formSerial);
    if (formSerialIndex === -1) {
        formId = helper_1.Helper.uuid();
        base_form_1.BaseForm.formSerials[formId] = formSerial;
    }
    else {
        formId = Object.keys(base_form_1.BaseForm.formSerials)[formSerialIndex];
    }
    if (base_form_1.BaseForm.instances[formId]) {
        if (!(base_form_1.BaseForm.instances[formId] instanceof task_form_1.TaskForm)) {
            throw new Error('Something went wrong');
        }
        if (JSON.stringify(fields) !== base_form_1.BaseForm.instances[formId].serializedDescriptors) {
            base_form_1.BaseForm.instances[formId].resetFieldDescriptors(fields);
            base_form_1.BaseForm.instances[formId].rerender(true);
        }
        return base_form_1.BaseForm.instances[formId];
    }
    const taskForm = new task_form_1.TaskForm(formId, authRecord, artifacts, role, repository, task, fields, () => {
        delete base_form_1.BaseForm.instances[formId];
        // delete BaseForm.formSerials[formId];
    });
    base_form_1.BaseForm.instances[formId] = taskForm;
    return taskForm;
};
exports.TaskFormFactory = TaskFormFactory;
const FormConstructor = (init, validations) => {
    const collectionCleanup = [];
    const iteration = helper_1.Helper.iterate(helper_1.Helper.clone(validations), '', (item, prefix, transformer, prop) => {
        if (!(item instanceof Array)) {
            const nextKey = prefix ? `${prefix}.${prop}` : prop;
            collectionCleanup.push(() => lodash_1.default.unset(init, nextKey));
            // single collection
            const scolFieldInit = lodash_1.default.get(init, prefix ? `${prefix}.${prop}` : prop).values || {};
            if (typeof item.min === 'undefined' && typeof item.max === 'undefined') {
                return {
                    type: 'singleCollection',
                    fields: helper_1.Helper.iterate(item.fields, `${nextKey}.fields`, transformer),
                    values: scolFieldInit,
                };
            }
            // multi collection
            const mcolFieldInit = lodash_1.default.get(init, prefix ? `${prefix}.${prop}` : prop).values || [];
            return {
                type: 'collection',
                min: item.min,
                max: item.max,
                fields: helper_1.Helper.iterate(item.fields, `${nextKey}.fields`, transformer),
                values: mcolFieldInit,
            };
        }
        const key = prefix ? `${prefix}.${prop}` : prop;
        const fieldInit = lodash_1.default.get(init, key);
        if (!fieldInit) {
            throw new Error(`[FormConstructor]: field "${key}" is missing in init, although it is found in validations`);
        }
        lodash_1.default.unset(init, key);
        return {
            type: fieldInit.field,
            value: fieldInit.input,
            validations: item,
        };
    });
    collectionCleanup.map((fn) => fn());
    if (Object.keys(init).length) {
        // throw new Error(`[FormConstructor]: form field constructor is corrupt`);
    }
    return { constructors: iteration, validations };
};
exports.FormConstructor = FormConstructor;
