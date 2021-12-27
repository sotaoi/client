"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignFields = void 0;
const collection_field_1 = require("@sotaoi/client-forms/fields/collection-field");
const assignFields = (form, prefix, fields) => {
    const assignedFields = {};
    Object.entries(fields).map(([name, props]) => {
        const key = prefix ? `${prefix}.${name}` : name;
        if (props.type === 'singleCollection') {
            const collection = props;
            assignedFields[name] = new collection_field_1.SingleCollectionField(name, () => form.rerender, form, key, () => form.formValidation, collection.fields, collection.values);
            return;
        }
        if (props.type === 'collection') {
            const collection = props;
            assignedFields[name] = new collection_field_1.CollectionField(name, () => form.rerender, form, key, () => form.formValidation, collection.min, collection.max, collection.fields, collection.values);
            return;
        }
        const constructor = props;
        assignedFields[name] = new constructor.type(name, key, () => form.formValidation, constructor.validations, () => form.rerender, constructor.value);
    });
    return assignedFields;
};
exports.assignFields = assignFields;
