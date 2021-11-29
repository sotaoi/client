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
exports.NumberInput = exports.NumberField = void 0;
const react_1 = __importDefault(require("react"));
const base_field_1 = require("@sotaoi/client/forms/fields/base-field");
const number_input_1 = require("@sotaoi/input/number-input");
Object.defineProperty(exports, "NumberInput", { enumerable: true, get: function () { return number_input_1.NumberInput; } });
const helper_1 = require("@sotaoi/client/helper");
class NumberField extends base_field_1.BaseField {
    constructor(name, key, getFormValidation, validations, getRerender, value) {
        super(name, key, getFormValidation, validations, getRerender, value);
    }
    init() {
        return {
            value: this.getInputValue(this.value),
            onChange: (ev) => __awaiter(this, void 0, void 0, function* () {
                this.set(this.convert(ev.target.value));
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
        this.value = input;
        (_a = this._ref) === null || _a === void 0 ? void 0 : _a.setValue(input);
    }
    clear() {
        this.setTouched(true);
        throw new Error('number field cannot call "clear" method, no neutral value implemented');
        // this.setTouched(false);
        // this.set(new NumberInput(0));
    }
    isEmpty() {
        return !this.getInputValue();
    }
    convert(value) {
        if (value instanceof number_input_1.NumberInput) {
            return value;
        }
        if (typeof value !== 'number') {
            throw new Error('number field cannot call "clear" method, no neutral value implemented');
        }
        return new number_input_1.NumberInput(value);
    }
    getInputValue(input = this.value) {
        return input.getValue();
    }
    wasChanged() {
        return this.getInputValue() !== this.initialValue.getValue();
    }
    //
    initialState(props) {
        return { value: props.value.tonumber() };
    }
    setValue(input, context) {
        context.setState({ value: input.getValue() });
    }
    getValue(context) {
        return context.state.value;
    }
    render(context) {
        if (helper_1.Helper.isWeb()) {
            return react_1.default.createElement("input", Object.assign({}, context.props, { value: context.state.value }));
        }
        if (helper_1.Helper.isMobile()) {
            throw new Error('Please update this section');
            // const { onChange, ..._props } = context.props as any;
            // return (
            //   <TextInput
            //     onChangeText={(value: number): void => onChange({ target: { value } })}
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
        return Object.assign(Object.assign({}, state), { value: nextProps.value });
    }
}
exports.NumberField = NumberField;
