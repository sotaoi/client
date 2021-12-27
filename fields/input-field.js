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
exports.StringInput = exports.InputField = void 0;
const react_1 = __importDefault(require("react"));
const base_field_1 = require("@sotaoi/client-forms/fields/base-field");
const string_input_1 = require("@sotaoi/input/string-input");
const helper_1 = require("@sotaoi/client/helper");
class InputField extends base_field_1.BaseField {
    constructor(name, key, getFormValidation, validations, getRerender, value) {
        super(name, key, getFormValidation, validations, getRerender, value);
    }
    init() {
        return {
            value: this.getInputValue(this.value || null),
            onChange: (ev) => __awaiter(this, void 0, void 0, function* () {
                this.set(this.convert(ev.target.value || null));
                yield this.validate();
                this.rerender(true);
            }),
            onBlur: (ev) => __awaiter(this, void 0, void 0, function* () {
                this.setTouched(true);
                yield this.validate();
                this.rerender(true);
            }),
        };
    }
    set(input) {
        var _a;
        this.value = input || null;
        (_a = this._ref) === null || _a === void 0 ? void 0 : _a.setValue(input || null);
    }
    clear() {
        this.setTouched(true);
        this.set(new string_input_1.StringInput(null));
    }
    isEmpty() {
        return !this.getInputValue();
    }
    convert(value) {
        if (value instanceof string_input_1.StringInput) {
            return value;
        }
        return new string_input_1.StringInput(typeof value === 'string' ? value : null);
    }
    getInputValue(input = this.value) {
        return input.getValue();
    }
    wasChanged() {
        return this.getInputValue() !== this.initialValue.getValue();
    }
    //
    initialState(props) {
        return { value: props.value ? props.value.toString() : null };
    }
    setValue(input, context) {
        context.setState({ value: input.getValue() });
    }
    getValue(context) {
        return context.state.value || null;
    }
    render(context) {
        var _a;
        if (helper_1.Helper.isWeb()) {
            return react_1.default.createElement("input", Object.assign({}, context.props, { value: (_a = context.state.value) !== null && _a !== void 0 ? _a : '' }));
        }
        if (helper_1.Helper.isMobile()) {
            return null;
            // const autoCapitalize = context.props.autoCapitalize || 'none';
            // const keyboardType = context.props.keyboardType || 'default';
            // const secureTextEntry = context.props.secureTextEntry || false;
            // const { onChange, ..._props } = context.props as any;
            // return (
            //   <TextInput
            //     autoCapitalize={autoCapitalize}
            //     keyboardType={keyboardType}
            //     secureTextEntry={secureTextEntry}
            //     onChangeText={(value: string): void => onChange({ target: { value } })}
            //     {...(_props as any)}
            //     value={context.state.value}
            //   />
            // );
        }
        if (helper_1.Helper.isElectron()) {
            throw new Error('electron is not implemented');
        }
        throw new Error('unknown environment in input component');
    }
    static getDerivedStateFromProps(nextProps, state) {
        return Object.assign(Object.assign({}, state), { value: nextProps.value || null });
    }
}
exports.InputField = InputField;
var string_input_2 = require("@sotaoi/input/string-input");
Object.defineProperty(exports, "StringInput", { enumerable: true, get: function () { return string_input_2.StringInput; } });
