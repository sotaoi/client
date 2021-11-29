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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefSelectInput = exports.RefSelectField = void 0;
const react_1 = __importDefault(require("react"));
const base_field_1 = require("@sotaoi/client/forms/fields/base-field");
const artifacts_1 = require("@sotaoi/contracts/artifacts");
const ref_select_input_1 = require("@sotaoi/input/ref-select-input");
Object.defineProperty(exports, "RefSelectInput", { enumerable: true, get: function () { return ref_select_input_1.RefSelectInput; } });
const helper_1 = require("@sotaoi/client/helper");
class RefSelectField extends base_field_1.BaseField {
    constructor(name, key, getFormValidation, validations = [], getRerender, value) {
        super(name, key, getFormValidation, validations, getRerender, value);
        this.webRef = null;
        this.mobileRef = null;
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
        this.set(this.convert(null));
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
        if (!value || typeof value === 'string') {
            return new ref_select_input_1.RefSelectInput(typeof value === 'string' ? artifacts_1.RecordRef.deserialize(value) : null);
        }
        if (value instanceof artifacts_1.RecordRef) {
            return new ref_select_input_1.RefSelectInput(value);
        }
        if (value instanceof ref_select_input_1.RefSelectInput) {
            return value;
        }
        throw new Error('ref convert error');
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
        var _a;
        context.setState({ value: ((_a = this.getInputValue(input)) === null || _a === void 0 ? void 0 : _a.serialize()) || '' });
    }
    getValue(context) {
        context.state.value;
    }
    render(context) {
        if (helper_1.Helper.isWeb()) {
            let props = __rest(context.props, []);
            return (react_1.default.createElement("select", Object.assign({ ref: (ref) => ref && (this.webRef = ref) }, props, { style: Object.assign({}, (props.style || {})), value: context.state.value }), props.children));
        }
        if (helper_1.Helper.isMobile()) {
            throw new Error('Please update this section');
            // const { onChange, ...props } = context.props;
            // return (
            //   <Picker
            //     ref={(ref): null | Picker<any> => ref && (this.mobileRef = ref)}
            //     selectedValue={context.state.value}
            //     onValueChange={(value: any, index: number): void => onChange({ target: { value } })}
            //     style={{ ...(props.style || {}) }}
            //   >
            //     {props.children}
            //   </Picker>
            // );
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
exports.RefSelectField = RefSelectField;
