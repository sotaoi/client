"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMaintainerForm = void 0;
const react_1 = __importDefault(require("react"));
const AuthMaintainerForm = (props) => {
    const Form = props.form;
    const fields = Form.getFields();
    return (react_1.default.createElement("section", { style: { margin: 20 } },
        react_1.default.createElement(Form.FormComponent, null,
            react_1.default.createElement("div", { className: 'w-full max-w-xs m-auto bg-gray-100 rounded p-5' },
                react_1.default.createElement("h1", { className: 'text-center sm:text-3xl text-2xl font-medium title-font mb-4 text-indigo-900' }, "LOGIN"),
                fields.email.wasTouched() &&
                    fields.email.getErrors().map((error, index) => (react_1.default.createElement("div", { key: index, className: 'text-red-600 text-sm' }, error))),
                react_1.default.createElement(fields.email.component, { className: 'w-full p-2 mb-6 text-black border-b-2 border-green-500 outline-none focus:bg-gray-300', placeholder: 'email' }),
                react_1.default.createElement("br", null),
                fields.password.wasTouched() &&
                    fields.password.getErrors().map((error, index) => (react_1.default.createElement("div", { key: index, style: { color: '#ff3333', marginBottom: 10 } }, error))),
                react_1.default.createElement(fields.password.component, { autoComplete: 'off', type: 'password', placeholder: 'password', className: 'w-full p-2 mb-6 text-black border-b-2 border-green-500 outline-none focus:bg-gray-300' }),
                react_1.default.createElement("br", null),
                react_1.default.createElement("button", { disabled: !Form.getFormState().canSubmit, type: 'submit', onClick: () => {
                        Form.submit();
                    } }, "Login")))));
};
exports.AuthMaintainerForm = AuthMaintainerForm;
