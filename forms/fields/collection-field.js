"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionField = exports.SingleCollectionField = void 0;
const assign_fields_1 = require("@sotaoi/client/forms/fields/assign-fields");
const base_field_1 = require("@sotaoi/client/forms/fields/base-field");
const helper_1 = require("@sotaoi/client/helper");
class SingleCollectionField extends base_field_1.BaseField {
    constructor(name, getSetState, form, key, getFormValidation, standardFields, values) {
        super(name, key, getFormValidation, [], getSetState, null);
        this.type = 'singleCollection';
        this.fields = {};
        this.form = form;
        this.standardFields = () => {
            return assign_fields_1.assignFields(this.form, `${key}.fields`, standardFields);
        };
        this.fields = Object.assign({}, this.standardFields());
        this.values = values;
        this.assignValues();
    }
    init() {
        throw new Error('collection field does not have init method');
    }
    set(values) {
        this.values = values;
    }
    clear() {
        throw new Error('collection field does not have clear method');
    }
    getFields() {
        return this.fields;
    }
    isEmpty() {
        throw new Error('collection field cannot be empty or otherwise');
    }
    convert(value) {
        return value;
    }
    getInputValue(value = this.value) {
        throw new Error('cannot get field value of a collection');
    }
    wasChanged() {
        throw new Error('single collection field cannot implement "wasChanged"');
    }
    assignValues() {
        Object.entries(this.values).map(([key, value]) => {
            this.fields[key].set(this.fields[key].convert(value));
        });
    }
    // no-op
    initialState(props) {
        throw new Error('single collection field cannot implement "initialState"');
    }
    setValue(context) {
        throw new Error('single collection field cannot implement "getValue"');
    }
    getValue(context) {
        throw new Error('single collection field cannot implement "getValue"');
    }
    render(context) {
        throw new Error('single collection field cannot implement "render"');
    }
}
exports.SingleCollectionField = SingleCollectionField;
class CollectionField extends base_field_1.BaseField {
    constructor(name, getSetState, form, key, getFormValidation, min, max, standardFields, values) {
        super(name, key, getFormValidation, [], getSetState, null);
        this.type = 'collection';
        this.fields = [];
        this.form = form;
        this.min = min;
        this.max = max;
        this.values = values;
        this.standardFields = () => assign_fields_1.assignFields(this.form, `${key}.fields.${this.fields.length.toString()}`, standardFields);
        if (this.min || this.values.length) {
            const count = this.values.length > (this.min || 0) ? this.values.length : this.min || 0;
            for (let i = 0; i < count; i++) {
                const values = typeof this.values[i] !== 'undefined' ? this.values[i] : null;
                this._addGroup(values);
            }
        }
    }
    getSizeErrors() {
        const key = `${this.key}.size`;
        const apiErrors = this.getFormValidation().getApiErrors(key);
        if (apiErrors.length) {
            return apiErrors;
        }
        return this.getFormValidation().getErrors(key);
    }
    init() {
        throw new Error('collection field does not have init method');
    }
    set(values) {
        this.values = values;
        for (let i = 0; i < this.values.length; i++) {
            if (typeof this.fields[i] === 'undefined') {
                this.addGroup();
                continue;
            }
            this.assignValues(this.fields[i], this.values[i]);
        }
    }
    static ok() {
        return 'asd';
    }
    clear() {
        throw new Error('collection field does not have clear method');
    }
    getFieldGroups() {
        return this.fields;
    }
    addGroup() {
        if (!this.canAddGroup()) {
            return;
        }
        this._addGroup(null);
        this.getFormValidation()
            .validateCollections(this.form.fields, this.form.validations, '')
            .then((res) => {
            this.rerender(true);
        });
    }
    reindex(from, to) {
        let index;
        const field = this.fields[from];
        this.fields.splice(to, 0, field);
        (index = this.fields.indexOf(field)) === to ? this.fields.splice(from + 1, 1) : this.fields.splice(index, 1);
        this.renderUuid = helper_1.Helper.uuid();
        this.rerender(true);
    }
    canAddGroup() {
        return !(this.max !== null && this.fields.length >= this.max);
    }
    canRemoveGroup(index) {
        return index < this.fields.length && (this.min === null || this.fields.length > this.min);
    }
    removeGroup(index) {
        if (index >= this.fields.length) {
            console.warn('cannot remove group, bad index');
            return;
        }
        if (this.min && this.fields.length <= this.min) {
            console.warn('cannot remove group, minimum field groups required');
            return;
        }
        this.fields.splice(index, 1);
        this.renderUuid = helper_1.Helper.uuid();
        this.getFormValidation()
            .validateCollections(this.form.fields, this.form.validations, '')
            .then((res) => {
            this.rerender(true);
        });
    }
    assignValues(collectionFieldGroup, values) {
        try {
            values &&
                Object.entries(values).map(([key, value]) => {
                    collectionFieldGroup[key].set(collectionFieldGroup[key].convert(value));
                });
        }
        catch (err) {
            console.warn(err);
        }
    }
    wasChanged() {
        throw new Error('multi collection field cannot implement "wasChanged"');
    }
    convert(value) {
        return value;
    }
    isEmpty() {
        throw new Error('collection field cannot be empty or otherwise');
    }
    getInputValue(input) {
        throw new Error('cannot get field value of a collection');
    }
    _addGroup(values) {
        const collectionFieldGroup = Object.assign({}, this.standardFields());
        this.assignValues(collectionFieldGroup, values);
        this.fields.push(collectionFieldGroup);
    }
    // no-op
    initialState(props) {
        throw new Error('multi collection field cannot implement "initialState"');
    }
    setValue(context) {
        throw new Error('multi collection field cannot implement "setValue"');
    }
    getValue(context) {
        throw new Error('multi collection field cannot implement "getValue"');
    }
    render(context) {
        throw new Error('multi collection field cannot implement "render"');
    }
}
exports.CollectionField = CollectionField;
