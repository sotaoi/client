"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseForm = void 0;
const react_1 = __importDefault(require("react"));
const assign_fields_1 = require("@sotaoi/client/forms/fields/assign-fields");
const transactions_1 = require("@sotaoi/contracts/transactions");
const artifacts_1 = require("@sotaoi/contracts/artifacts");
const helper_1 = require("@sotaoi/client/helper");
const lodash_1 = __importDefault(require("lodash"));
const action_1 = require("@sotaoi/client/action");
const output_1 = require("@sotaoi/client/output");
const store_1 = require("@sotaoi/client/store");
class BaseForm {
    constructor(formId, authRecord, artifacts, role, repository, fieldDescriptors, destroy) {
        this.unmounted = false;
        this.init = (initialState = {}) => {
            this.unmounted = false;
            if (this.initialState === null || this.state === null) {
                this.initialState = helper_1.Helper.clone(Object.assign(Object.assign({}, initialState), { form: this._getFormState() }));
                this.state = helper_1.Helper.clone(this.initialState);
            }
            let [state, _setState] = react_1.default.useState(this.state);
            this.setState = (state = {}) => {
                _setState(Object.assign(Object.assign({}, state), { form: this._getFormState() }));
            };
            this.getState = () => state;
            this.rerender = (force = false) => {
                if (this.unmounted) {
                    return;
                }
                state.form = this._getFormState();
                if (force) {
                    _setState(Object.assign({}, state));
                    return;
                }
                _setState(state);
            };
        };
        this.unmount = () => {
            this.destroy();
            this.unmounted = true;
        };
        //
        this.resetFieldDescriptors = (fieldDescriptors) => {
            this.serializedDescriptors = JSON.stringify(fieldDescriptors);
            this.fieldConstructors = fieldDescriptors.constructors;
            // @ts-ignore
            this.fields = assign_fields_1.assignFields(this, '', this.fieldConstructors);
            this.validations = fieldDescriptors.validations;
        };
        if (typeof BaseForm.inputValidator === 'undefined') {
            throw new Error('form initialization error, no input validator');
        }
        this.formId = formId;
        this.authRecord = authRecord;
        this.artifacts = artifacts;
        this.role = role;
        this.repository = repository;
        this.serializedDescriptors = JSON.stringify(fieldDescriptors);
        this.uuid = null;
        this.strategy = null;
        this.task = null;
        this.fieldConstructors = fieldDescriptors.constructors;
        // @ts-ignore
        this.fields = assign_fields_1.assignFields(this, '', this.fieldConstructors);
        this.formValidation = BaseForm.inputValidator.getFormValidation((key) => { var _a; return ((_a = lodash_1.default.get(this.getFields(), key)) === null || _a === void 0 ? void 0 : _a.value) || null; });
        this.setState = (state) => undefined;
        this.getState = () => ({
            getFields: () => ({}),
            canSubmit: false,
            valid: false,
            sending: false,
            validating: false,
            errors: '',
            apiErrors: '',
        });
        this.rerender = () => undefined;
        this.onCommandSuccess = (onCommandSuccessFn) => {
            this._realOnCommandSuccess = onCommandSuccessFn;
        };
        this.onAuthSuccess = (onAuthSuccessFn) => {
            this._realOnAuthSuccess = onAuthSuccessFn;
        };
        this.onTaskSuccess = (onTaskSuccessFn) => {
            this._realOnTaskSuccess = onTaskSuccessFn;
        };
        this.destroy = destroy;
        this.validations = fieldDescriptors.validations;
        this._sending = false;
        this._validating = false;
        this._realOnCommandSuccess = (result) => __awaiter(this, void 0, void 0, function* () { return undefined; });
        this._realOnAuthSuccess = (result) => __awaiter(this, void 0, void 0, function* () { return undefined; });
        this._realOnTaskSuccess = (result) => __awaiter(this, void 0, void 0, function* () { return undefined; });
        this.state = null;
        this.initialState = null;
        this.reset = () => {
            this.destroy();
            this.setState(helper_1.Helper.clone(this.initialState || {}));
        };
    }
    //
    action(type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let conclusion;
                let commandOutput;
                let authOutput;
                let taskOutput;
                let validationResult;
                const isUpdateCommand = type === 'update' && output_1.Output.ALLOW_SKIP_UNCHANGED;
                helper_1.Helper.iterate(this.fields, '', output_1.Output.getTouchFieldsTransformer(isUpdateCommand));
                this.setValidating(true);
                yield this.formValidation.validatePayload(this.fields, this.validations, '', type === 'update' && output_1.Output.ALLOW_SKIP_UNCHANGED);
                validationResult = this.formValidation.getResult();
                this.setValidating(false);
                if (!validationResult.valid) {
                    // todo lowprio: sweet alert
                    console.warn('Validation result: ', validationResult);
                    return;
                }
                this.setSending(true);
                let payloadInit;
                switch (true) {
                    case type === 'store':
                        payloadInit = helper_1.Helper.flatten(helper_1.Helper.iterate(helper_1.Helper.clone(this._getFormState().getFields()), '', output_1.Output.getFieldTransformer(false)));
                        conclusion = yield action_1.Action.store(
                        // access token
                        store_1.store().getAccessToken(), 
                        // artifacts
                        this.artifacts, 
                        // role
                        this.role, 
                        // repository
                        this.repository, 
                        // payload
                        new transactions_1.Payload(payloadInit));
                        BaseForm.NOTIFY && (yield conclusion.notify());
                        commandOutput = conclusion.commandResult();
                        break;
                    case type === 'update':
                        payloadInit = helper_1.Helper.flatten(helper_1.Helper.iterate(helper_1.Helper.clone(this._getFormState().getFields()), '', output_1.Output.getFieldTransformer(true)));
                        if (!this.uuid) {
                            throw new Error('something went wrong - update form is missing uuid');
                        }
                        conclusion = yield action_1.Action.update(
                        // access token
                        store_1.store().getAccessToken(), 
                        // artifacts
                        this.artifacts, 
                        // role
                        this.role, 
                        // repository
                        this.repository, 
                        // uuid,
                        this.uuid, 
                        // payload
                        new transactions_1.Payload(payloadInit));
                        BaseForm.NOTIFY && (yield conclusion.notify());
                        commandOutput = conclusion.commandResult();
                        break;
                    case type === 'auth':
                        payloadInit = helper_1.Helper.flatten(helper_1.Helper.iterate(helper_1.Helper.clone(this._getFormState().getFields()), '', output_1.Output.getFieldTransformer(false)));
                        if (!this.strategy) {
                            throw new Error('something went wrong - auth form is missing strategy');
                        }
                        conclusion = yield action_1.Action.auth(
                        // artifacts
                        this.artifacts, 
                        // repository
                        this.repository, 
                        // strategy
                        this.strategy || '', 
                        // payload
                        new transactions_1.Payload(payloadInit));
                        // no await notify here
                        // BaseForm.NOTIFY && (await conclusion.notify());
                        BaseForm.NOTIFY && conclusion.notify();
                        authOutput = conclusion.authResult();
                        if (!authOutput.success) {
                            this.formValidation.setErrorResult(authOutput.getError());
                            this.setSending(false);
                            return;
                        }
                        if (!authOutput.authRecord) {
                            throw new Error('something went wrong - auth command failure');
                        }
                        authOutput.authRecord = artifacts_1.AuthRecord.deserialize(authOutput.authRecord);
                        if (!(authOutput.authRecord instanceof artifacts_1.AuthRecord)) {
                            throw new Error('something went wrong - auth record unknown type');
                        }
                        this.setSending(false);
                        this.reset();
                        yield store_1.store().setAuthRecord(authOutput.authRecord, authOutput.accessToken);
                        yield this._realOnAuthSuccess(authOutput);
                        return;
                    case type === 'task':
                        payloadInit = helper_1.Helper.flatten(helper_1.Helper.iterate(helper_1.Helper.clone(this._getFormState().getFields()), '', output_1.Output.getFieldTransformer(false)));
                        if (!this.task) {
                            throw new Error('something went wrong - no task in form');
                        }
                        conclusion = yield action_1.Action.task(
                        // access token
                        store_1.store().getAccessToken(), 
                        // artifacts
                        this.artifacts, 
                        // role
                        this.role, 
                        // repository
                        this.repository, 
                        // task,
                        this.task, 
                        // payload
                        new transactions_1.Payload(payloadInit));
                        BaseForm.NOTIFY && (yield conclusion.notify());
                        taskOutput = conclusion.taskResult();
                        if (!taskOutput.success) {
                            this.formValidation.setErrorResult(taskOutput.getError());
                            this.setSending(false);
                            return;
                        }
                        this.setSending(false);
                        this.reset();
                        yield this._realOnTaskSuccess(taskOutput);
                        return;
                    default:
                        throw new Error(`action type "${type}" not implemented`);
                }
                if (!commandOutput.success) {
                    this.formValidation.setErrorResult(commandOutput.getError());
                    this.setSending(false);
                    return;
                }
                this.setSending(false);
                type !== 'update' && this.reset();
                yield this._realOnCommandSuccess(commandOutput);
            }
            catch (err) {
                this.setSending(false);
                this.setValidating(false);
                console.warn(err);
            }
        });
    }
    getFormState() {
        return this.getState().form;
    }
    getFields() {
        return this.getState().form.getFields();
    }
    static setup(inputValidator) {
        this.inputValidator = inputValidator;
    }
    setSending(sending) {
        this._sending = sending;
        this.setState(Object.assign({}, this.getState()));
    }
    setValidating(validating) {
        this._validating = validating;
        this.setState(Object.assign({}, this.getState()));
    }
    _getFormState() {
        return {
            getFields: () => BaseForm.instances[this.formId].fields,
            // canSubmit: this.formValidation.isValid() && !this._sending && !this._validating,
            canSubmit: !this._sending && !this._validating,
            valid: this.formValidation.isValid(),
            sending: this._sending,
            validating: this._validating,
            errors: JSON.stringify(this.formValidation.getResult().validations),
            apiErrors: JSON.stringify(this.formValidation.getAllApiErrors()),
        };
    }
}
exports.BaseForm = BaseForm;
BaseForm.NOTIFY = false;
BaseForm.instances = {};
BaseForm.formSerials = {};
