"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Output = void 0;
const base_field_1 = require("@sotaoi/client/forms/fields/base-field");
const collection_field_1 = require("@sotaoi/client/forms/fields/collection-field");
const helper_1 = require("@sotaoi/client/helper");
class Output {
    static getTouchFieldsTransformer(isUpdateCommand) {
        return (item, prefix, transformer, prop) => {
            const key = prefix ? `${prefix}.${prop}` : prop;
            switch (true) {
                case item instanceof collection_field_1.SingleCollectionField:
                case item instanceof collection_field_1.CollectionField:
                    // multi collection
                    if (item.fields instanceof Array) {
                        item.fields.map((field, index) => transformer(field, `${key}.fields.${index.toString()}`, this.getTouchFieldsTransformer(isUpdateCommand), ''));
                        return item;
                    }
                    // single collection
                    transformer(item.fields, `${key}.fields`, this.getTouchFieldsTransformer(isUpdateCommand), '');
                    return item;
                // single field
                case item instanceof base_field_1.BaseField:
                    !isUpdateCommand && item.setTouched(true);
                    return item;
                default:
                    helper_1.Helper.iterate(item, `${key}`, this.getTouchFieldsTransformer(isUpdateCommand));
                    return item;
            }
        };
    }
    static getFieldTransformer(skipUnchanged) {
        return (item, prefix, transformer, prop) => {
            const key = prefix ? `${prefix}.${prop}` : prop;
            switch (true) {
                case item instanceof collection_field_1.SingleCollectionField:
                case item instanceof collection_field_1.CollectionField:
                    // multi collection
                    if (item.fields instanceof Array) {
                        return item.fields.map((field, index) => transformer(field, `${key}.fields.${index.toString()}`, this.getFieldTransformer(skipUnchanged), ''));
                    }
                    // single collection
                    return transformer(item.fields, `${key}.fields`, this.getFieldTransformer(skipUnchanged), '');
                // single field
                case item instanceof base_field_1.BaseField:
                    if (skipUnchanged && !item.wasChanged() && Output.ALLOW_SKIP_UNCHANGED) {
                        return;
                    }
                    return item.value !== null ? item.value.serialize() : null;
                default:
                    return helper_1.Helper.iterate(item, `${key}`, this.getFieldTransformer(skipUnchanged));
            }
        };
    }
    // OMNI
    static parseCommand(output) {
        const { CommandResult } = require('@sotaoi/contracts/transactions');
        try {
            switch (true) {
                case typeof output !== 'object':
                case typeof output.code !== 'number':
                case typeof output.errorCode !== 'string' && output.errorCode !== null:
                case typeof output.title !== 'string':
                case typeof output.msg !== 'string':
                case typeof output.artifact === 'undefined':
                case typeof output.validations === 'undefined':
                case typeof output.xdata === 'undefined':
                    throw new Error('bad command output');
                default:
                    return new CommandResult(output.code, output.errorCode, output.title, output.msg, output.artifact || null, output.validations || null, output.xdata || {});
            }
        }
        catch (err) {
            const { ErrorCode } = require('@sotaoi/contracts/errors');
            return new CommandResult(400, ErrorCode.APP_GENERIC_ERROR, err && err.name ? err.name : 'Error', err && err.message ? err.message : 'Something went wrong', null, null, {});
        }
    }
    // parseQuery
    // parseRetrieve
    static parseAuth(output) {
        const { AuthResult } = require('@sotaoi/contracts/transactions');
        try {
            switch (true) {
                case typeof output !== 'object':
                case typeof output.code !== 'number':
                case typeof output.errorCode !== 'string' && output.errorCode !== null:
                case typeof output.title !== 'string':
                case typeof output.msg !== 'string':
                case typeof output.authRecord === 'undefined':
                case typeof output.accessToken === 'undefined':
                case typeof output.validations === 'undefined':
                case typeof output.xdata === 'undefined':
                    throw new Error('bad auth output');
                default:
                    return new AuthResult(output.code, output.errorCode, output.title, output.msg, output.authRecord || null, output.accessToken || null, output.validations || null, output.xdata || {});
            }
        }
        catch (err) {
            const { ErrorCode } = require('@sotaoi/contracts/errors');
            return new AuthResult(400, ErrorCode.APP_GENERIC_ERROR, err && err.name ? err.name : 'Error', err && err.message ? err.message : 'Something went wrong', null, null, null, {});
        }
    }
    static parseTask(output) {
        const { TaskResult } = require('@sotaoi/contracts/transactions');
        try {
            switch (true) {
                case typeof output !== 'object':
                case typeof output.code !== 'number':
                case typeof output.errorCode !== 'string' && output.errorCode !== null:
                case typeof output.title !== 'string':
                case typeof output.msg !== 'string':
                case typeof output.data === 'undefined':
                case typeof output.validations === 'undefined':
                case typeof output.xdata === 'undefined':
                    throw new Error('bad task output');
                default:
                    return new TaskResult(output.code, output.errorCode, output.title, output.msg, output.data || null, output.validations || null, output.xdata || {});
            }
        }
        catch (err) {
            const { ErrorCode } = require('@sotaoi/contracts/errors');
            return new TaskResult(400, ErrorCode.APP_GENERIC_ERROR, err && err.name ? err.name : 'Error', err && err.message ? err.message : 'Something went wrong', null, null, {});
        }
    }
}
exports.Output = Output;
Output.ALLOW_SKIP_UNCHANGED = true;
