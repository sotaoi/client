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
exports.BaseField = void 0;
const react_1 = __importDefault(require("react"));
const helper_1 = require("@sotaoi/client/helper");
const helper_2 = require("@sotaoi/input/helper");
class BaseComponent extends react_1.default.Component {
}
class BaseField {
    constructor(name, key, getFormValidation, validations, getRerender, value) {
        this.renderUuid = helper_1.Helper.uuid();
        this.name = name;
        this.key = key;
        this.getFormValidation = getFormValidation;
        this.validations = validations;
        this.rerender = (force = false) => getRerender()(force);
        this.value = value;
        this.initialValue = helper_1.Helper.clone(value);
        this.touched = false;
        this._ref = null;
        const self = this;
        const Component = class extends BaseComponent {
            constructor(props) {
                super(props);
                this.state = self.initialState(props);
            }
            setValue(input) {
                return self.setValue(input, this);
            }
            getValue() {
                return self.getValue(this);
            }
            render() {
                return self.render(this);
            }
        };
        this.component = class extends react_1.default.Component {
            render() {
                return (react_1.default.createElement(Component, Object.assign({ ref: (ref) => ref && (self._ref = ref) }, self.init(), this.props)));
            }
        };
    }
    asset(item, role = 'assets') {
        return helper_2.asset(item, role);
    }
    assets(items, role = 'assets') {
        return (items && JSON.parse(items).map((item) => helper_2.asset(item, role))) || null;
    }
    getKey(index) {
        const fields = this.fields || {};
        return `${fields.length}:${index.toString()}:${this.renderUuid}`;
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.validations) {
                throw new Error('method "validate" should not have been called when null');
            }
            yield this.getFormValidation().validate(this.key, this.validations);
        });
    }
    isValid() {
        return !this.getFormValidation().getErrors(this.key).length;
    }
    getErrors() {
        const apiErrors = this.getFormValidation().getApiErrors(this.key);
        if (apiErrors.length) {
            return apiErrors;
        }
        return this.getFormValidation().getErrors(this.key);
    }
    setTouched(touched) {
        this.touched = touched;
    }
    wasTouched() {
        return this.touched;
    }
    collection() {
        const { CollectionField } = require('@sotaoi/client/forms/fields/collection-field');
        if (!(this instanceof CollectionField)) {
            throw new Error('Field is not a CollectionField');
        }
        return this;
    }
    addGroup() {
        throw new Error('cannot add field group, this is a single unit field (non collection)');
    }
    canRemoveGroup(index) {
        throw new Error('cannot call "canRemoveGroup" method, this is a single unit field (non collection)');
    }
    removeGroup(index) {
        throw new Error('cannot remove field group, this is a single unit field (non collection)');
    }
    static input(value) {
        const instance = new this('', '', '', () => ({}), [], () => ({}), null);
        return instance.convert(value).input(instance.constructor);
    }
}
exports.BaseField = BaseField;
