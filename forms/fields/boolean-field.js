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
exports.BooleanInput = exports.BooleanField = void 0;
const base_field_1 = require("@sotaoi/client/forms/fields/base-field");
const boolean_input_1 = require("@sotaoi/input/boolean-input");
Object.defineProperty(exports, "BooleanInput", { enumerable: true, get: function () { return boolean_input_1.BooleanInput; } });
const helper_1 = require("@sotaoi/client/helper");
class BooleanField extends base_field_1.BaseField {
    constructor(name, key, getFormValidation, validations = [], getRerender, value) {
        super(name, key, getFormValidation, validations, getRerender, value);
    }
    init() {
        return {
            value: this.getInputValue(this.value),
            onChange: (ev) => __awaiter(this, void 0, void 0, function* () {
                this.setTouched(true);
                this.set(this.convert(ev.target.value));
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
        this.set(this.convert(false));
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
        return boolean_input_1.BooleanInput.convert(value);
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
            const setValue = (value) => context.props.onChange({ target: { value } });
            return context.props.render(context.state.value, setValue);
        }
        if (helper_1.Helper.isMobile()) {
            const setValue = (value) => context.props.onChange({ target: { value } });
            return context.props.render(context.state.value, setValue);
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
exports.BooleanField = BooleanField;
