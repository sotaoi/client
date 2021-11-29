"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringInput = exports.TextField = void 0;
const react_1 = __importDefault(require("react"));
const input_field_1 = require("@sotaoi/client/forms/fields/input-field");
const helper_1 = require("@sotaoi/client/helper");
class TextField extends input_field_1.InputField {
    render(context) {
        if (helper_1.Helper.isWeb()) {
            return react_1.default.createElement("textarea", Object.assign({}, context.props, { value: context.state.value }));
        }
        if (helper_1.Helper.isMobile()) {
            throw new Error('mobile is not implemented');
        }
        if (helper_1.Helper.isElectron()) {
            throw new Error('electron is not implemented');
        }
        throw new Error('unknown environment in text component');
    }
}
exports.TextField = TextField;
var string_input_1 = require("@sotaoi/input/string-input");
Object.defineProperty(exports, "StringInput", { enumerable: true, get: function () { return string_input_1.StringInput; } });
