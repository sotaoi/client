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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormField = void 0;
const base_field_1 = require("@sotaoi/client/forms/fields/base-field");
const form_input_1 = require("@sotaoi/input/form-input");
class FormField extends base_field_1.BaseField {
    constructor(name, key, getFormValidation, validations, getRerender, value) {
        super(name, key, getFormValidation, validations, getRerender, value);
        this.pocket = {};
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
        this.set(new form_input_1.FormInput(null));
    }
    isEmpty() {
        return !this.getInputValue();
    }
    convert(value) {
        if (value instanceof form_input_1.FormInput) {
            return value;
        }
        return new form_input_1.FormInput(typeof value !== 'undefined' ? value : null);
    }
    getInputValue(input = this.value) {
        return input.getValue();
    }
    wasChanged() {
        return this.getInputValue() !== this.initialValue.getValue();
    }
    //
    initialState(props) {
        return { value: this.value.value || null };
    }
    setValue(input, context) {
        context.setState({ value: input.getValue() });
    }
    getValue(context) {
        return context.state.value || null;
    }
    render(context) {
        return context.props.render({
            value: context.state.value,
            change: (value) => {
                this.value.value = value;
                this.set(this.convert(this.value));
                this.validate();
                this.rerender(true);
                context.props.onChange(value);
            },
            pocket: (context.props.pocket || {}),
        });
    }
    static getDerivedStateFromProps(nextProps, state) {
        return Object.assign(Object.assign({}, state), { value: nextProps.value || null });
    }
}
exports.FormField = FormField;
