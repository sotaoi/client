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
exports.InstallForm = void 0;
const react_1 = __importDefault(require("react"));
const control_panel_commands_1 = require("@sotaoi/client/services/control-panel-service/control-panel-commands");
const InstallForm = () => {
    const [state, setState] = react_1.default.useState({ install: null });
    const installMaster = () => {
        setState({ install: 'master' });
    };
    const installBundle = () => {
        setState({ install: 'bundle' });
    };
    const goBack = () => {
        setState({ install: null });
    };
    const finish = () => __awaiter(void 0, void 0, void 0, function* () {
        const conclusion = yield control_panel_commands_1.installBundle();
        conclusion.notify();
        conclusion.result().success && setState({ install: true });
    });
    return (react_1.default.createElement("section", { className: 'p-4' },
        react_1.default.createElement("h4", null, "Hello"),
        react_1.default.createElement("hr", null),
        react_1.default.createElement("p", { className: 'mb-4' }, "Welcome"),
        state.install === null && (react_1.default.createElement("div", null,
            react_1.default.createElement("button", { onClick: installMaster, className: 'bg-blue-500 rounded py-1 px-2 text-white' }, "Install master"),
            react_1.default.createElement("span", { style: { margin: 10 } }),
            react_1.default.createElement("button", { onClick: installBundle, className: 'bg-blue-500 rounded py-1 px-2 text-white' }, "Install bundle"))),
        state.install === true && react_1.default.createElement("div", null, "All done. Please wait app restart"),
        state.install === 'master' && (react_1.default.createElement("div", null,
            react_1.default.createElement("button", { onClick: goBack, className: 'mb-4 bg-blue-500 rounded py-1 px-2 text-white' }, "Back"),
            react_1.default.createElement("div", { className: 'mb-4' }, "Installing master"),
            react_1.default.createElement("section", { className: 'mb-4' },
                react_1.default.createElement("div", null, "todo")),
            react_1.default.createElement("div", null,
                react_1.default.createElement("button", { onClick: finish, className: 'mb-4 bg-blue-500 rounded py-1 px-2 text-white' }, "Finish")))),
        state.install === 'bundle' && (react_1.default.createElement("div", null,
            react_1.default.createElement("button", { onClick: goBack, className: 'mb-4 bg-blue-500 rounded py-1 px-2 text-white' }, "Back"),
            react_1.default.createElement("div", null, "Installing bundle")))));
};
exports.InstallForm = InstallForm;
// import React from 'react';
// import { StoreForm } from '@sotaoi/client-forms/form-classes/store-form';
// import { BaseField } from '@sotaoi/client-forms/fields/base-field';
// import { FileField } from '@sotaoi/client-forms/fields/file-field';
// interface FieldState {
//   [key: string]: BaseField<any>;
//   avatar: FileField;
// }
// const WebRegisterUserForm = (props: { form: StoreForm; }): null | React.ReactElement => {
//   const Form = props.form;
//   const fields = Form.getFields<FieldState>();
//   // const address = fields.address.getFields();
//   // const countries = props.countries;
//   return (
//     <section style={{ margin: 20 }}>
//       <div className={'w-full max-w-md m-auto bg-white-100 shadow-md rounded p-5'}>
//         <h1 className={'text-center sm:text-3xl text-2xl font-medium title-font mb-4 text-indigo-900'}>Installation</h1>
//         <Form.FormComponent>
//           <button disabled={!Form.getFormState().canSubmit} type={'submit'} onClick={(): void => Form.submit()}>
//             Install
//           </button>
//           <br />
//           <br />
//           <br />
//           {fields.email.wasTouched() &&
//             fields.email.getErrors().map((error: any, index: any) => (
//               <div key={index} style={{ color: '#ff3333', marginBottom: 10 }}>
//                 {error}
//               </div>
//             ))}
//           <fields.email.component
//             className={'w-full p-2 mb-6 text-black border-b-2 border-green-500 outline-none focus:bg-gray-300'}
//             placeholder={'email'}
//           />
//           <br />
//           {fields.password.wasTouched() &&
//             fields.password.getErrors().map((error: any, index: any) => (
//               <div key={index} style={{ color: '#ff3333', marginBottom: 10 }}>
//                 {error}
//               </div>
//             ))}
//           <fields.password.component
//             autoComplete={'off'}
//             className={'w-full p-2 mb-6 text-black border-b-2 border-green-500 outline-none focus:bg-gray-300'}
//             placeholder={'password'}
//             type={'password'}
//           />
//           <br />
//           {fields.avatar.wasTouched() &&
//             fields.avatar.getErrors().map((error: any, index: any) => (
//               <div key={index} style={{ color: '#ff3333', marginBottom: 10 }}>
//                 {error}
//               </div>
//             ))}
//           <fields.avatar.component
//             className={'w-full p-2 mb-6 text-black border-b-2 border-green-500 outline-none focus:bg-gray-300'}
//           />
//           {fields.avatar.getPreview() && (
//             <div>
//               <img src={fields.avatar.getPreview()} />
//             </div>
//           )}
//           <br />
//           <button
//             className={'w-full bg-green-700 text-white font-bold py-2 px-4 mb-6 rounded'}
//             disabled={!Form.getFormState().canSubmit}
//             type={'submit'}
//             onClick={(): void => Form.submit()}
//           >
//             Install
//           </button>
//         </Form.FormComponent>
//       </div>
//     </section>
//   );
// };
// export { WebRegisterUserForm };
