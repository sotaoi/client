"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorComponent = void 0;
const react_1 = __importDefault(require("react"));
const errors_1 = require("@sotaoi/contracts/errors");
const helper_1 = require("@sotaoi/client/helper");
const react_native_1 = require("react-native");
const ErrorComponent = (props) => {
    switch (true) {
        case props.error instanceof errors_1.Errors.NotFoundView:
            if (helper_1.Helper.isMobile()) {
                return (react_1.default.createElement(react_native_1.View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center' } },
                    react_1.default.createElement(react_native_1.Text, null, "Not Found"),
                    react_1.default.createElement(react_native_1.Text, null, "We did not find what you were looking for")));
            }
            return (react_1.default.createElement("section", { className: 'p-4' },
                react_1.default.createElement("h3", null, "Not Found"),
                react_1.default.createElement("hr", null),
                react_1.default.createElement("p", null, "We did not find what you were looking for")));
        case props.error instanceof errors_1.Errors.ComponentFail:
            return react_1.default.createElement("section", null, "Error encountered");
        case props.error instanceof errors_1.Errors.NotFoundLayout:
        default:
            if (helper_1.Helper.isMobile()) {
                return (react_1.default.createElement(react_native_1.View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center' } },
                    react_1.default.createElement(react_native_1.Text, null, "This is fatal"),
                    react_1.default.createElement(react_native_1.Text, null, JSON.stringify(props.error))));
            }
            return (react_1.default.createElement("section", { className: 'p-4' },
                react_1.default.createElement("h3", null, "This is fatal"),
                react_1.default.createElement("hr", null),
                react_1.default.createElement("p", null, JSON.stringify(props.error))));
    }
};
exports.ErrorComponent = ErrorComponent;
