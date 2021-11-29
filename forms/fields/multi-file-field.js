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
exports.MultiFileInput = exports.MultiFileField = void 0;
const react_1 = __importDefault(require("react"));
const base_field_1 = require("@sotaoi/client/forms/fields/base-field");
const multi_file_input_1 = require("@sotaoi/input/multi-file-input");
Object.defineProperty(exports, "MultiFileInput", { enumerable: true, get: function () { return multi_file_input_1.MultiFileInput; } });
const file_input_1 = require("@sotaoi/input/file-input");
const helper_1 = require("@sotaoi/client/helper");
class MultiFileField extends base_field_1.BaseField {
    constructor(name, key, getFormValidation, validations, getRerender, value) {
        super(name, key, getFormValidation, validations, getRerender, value);
        this.ref = null;
    }
    init() {
        return {
            value: this.getInputValue(this.value),
            onChange: (ev) => __awaiter(this, void 0, void 0, function* () {
                this.setTouched(true);
                if (!ev.target.files.length) {
                    this.set([]);
                    yield this.validate();
                    this.rerender(true);
                    return;
                }
                this.set(ev.target.files);
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
        this.set([]);
        this.rerender(true);
    }
    isEmpty() {
        return this.value.isEmpty();
    }
    set(value) {
        var _a;
        this.value = this.convert(value);
        (_a = this._ref) === null || _a === void 0 ? void 0 : _a.setValue(this.value);
    }
    convert(value) {
        if (!value || (value instanceof Array && !value.length)) {
            return new multi_file_input_1.MultiFileInput([]);
        }
        if (typeof value === 'string') {
            const fileInputs = JSON.parse(value).map((asset) => new file_input_1.FileInput('', '', asset, null, null));
            return new multi_file_input_1.MultiFileInput(fileInputs);
        }
        if (value instanceof multi_file_input_1.MultiFileInput) {
            return value;
        }
        if (value instanceof FileList) {
            const input = new multi_file_input_1.MultiFileInput([]);
            for (let i = 0; i < value.length; i++) {
                input.append(new file_input_1.FileInput('', value[i].name, null, URL.createObjectURL(value[i]), value[i]));
            }
            return input;
        }
        throw new Error('multi file convert error');
    }
    getInputValue(input = this.value) {
        return input.getValue();
    }
    wasChanged() {
        // todo lowprio: implement
        return this.wasTouched();
    }
    getPreviews() {
        return this.getInputValue().map((fileInput) => fileInput.getPreview());
    }
    initialState(props) {
        return { value: props.value };
    }
    setValue(input, context) {
        if (!input.getValue().length) {
            this.ref && (this.ref.value = '');
            context.setState({ value: [] });
            return;
        }
        context.setState({ value: input.getFiles() });
    }
    getValue(context) {
        return context.state.value;
    }
    render(context) {
        if (helper_1.Helper.isWeb()) {
            const _a = context.props, { value } = _a, _props = __rest(_a, ["value"]);
            return (react_1.default.createElement("input", Object.assign({ type: 'file', multiple: true, ref: (ref) => ref && (this.ref = ref) }, _props)));
        }
        if (helper_1.Helper.isMobile()) {
            throw new Error('mobile is not implemented');
        }
        if (helper_1.Helper.isElectron()) {
            throw new Error('electron is not implemented');
        }
        throw new Error('unknown environment in multi file component');
    }
    static getDerivedStateFromProps(nextProps, state) {
        return Object.assign(Object.assign({}, state), { value: nextProps.value });
    }
}
exports.MultiFileField = MultiFileField;