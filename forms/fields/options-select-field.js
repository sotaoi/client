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
exports.OptionsSelectInput = exports.OptionsSelectField = void 0;
const base_field_1 = require("@sotaoi/client/forms/fields/base-field");
const options_select_input_1 = require("@sotaoi/input/options-select-input");
Object.defineProperty(exports, "OptionsSelectInput", { enumerable: true, get: function () { return options_select_input_1.OptionsSelectInput; } });
const helper_1 = require("@sotaoi/client/helper");
class OptionsSelectField extends base_field_1.BaseField {
    constructor(name, key, getFormValidation, validations = [], getRerender, value) {
        super(name, key, getFormValidation, validations, getRerender, value);
        this.options = this.value instanceof options_select_input_1.OptionsSelectInput ? Object.keys(this.getInputValue()) : [];
    }
    init() {
        return {
            value: this.getInputValue(this.value),
            onChange: (ev) => __awaiter(this, void 0, void 0, function* () {
                const options = this.getInputValue();
                options[ev.target.value] = ev.target.checked;
                this.setTouched(true);
                this.set(this.convert(options));
                yield this.validate();
                this.rerender(true);
            }),
            onBlur: (ev) => __awaiter(this, void 0, void 0, function* () {
                //
            }),
        };
    }
    clear() {
        this.setTouched(true);
        const options = {};
        this.options.map((option) => (options[option] = false));
        this.set(this.convert(options));
    }
    isEmpty() {
        return !this.value;
    }
    set(value) {
        var _a;
        this.value = this.convert(value);
        (_a = this._ref) === null || _a === void 0 ? void 0 : _a.setValue(this.value);
    }
    convert(value) {
        return options_select_input_1.OptionsSelectInput.convert(value);
    }
    getInputValue(input = this.value) {
        return input.getValue();
    }
    wasChanged() {
        // todo lowprio: implement
        return this.wasTouched();
    }
    //
    initialState(props) {
        return { value: props.value };
    }
    setValue(input, context) {
        context.setState({ value: this.getInputValue(input) });
    }
    getValue(context) {
        context.state.value;
    }
    render(context) {
        if (helper_1.Helper.isWeb()) {
            const onChange = (option, value) => () => context.props.onChange({ target: { checked: value, value: option } });
            return context.props.render(context.state.value, onChange);
        }
        if (helper_1.Helper.isMobile()) {
            throw new Error('mobile is not implemented');
        }
        if (helper_1.Helper.isElectron()) {
            throw new Error('electron is not implemented');
        }
        throw new Error('unknown environment ref select in component');
    }
    static getDerivedStateFromProps(nextProps, state) {
        return Object.assign(Object.assign({}, state), { value: nextProps.value });
    }
}
exports.OptionsSelectField = OptionsSelectField;
