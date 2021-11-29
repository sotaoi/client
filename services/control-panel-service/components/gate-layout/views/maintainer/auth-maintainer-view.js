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
exports.AuthMaintainerView = void 0;
const react_1 = __importDefault(require("react"));
const components_1 = require("@sotaoi/client/components");
const forms_1 = require("@sotaoi/client/forms");
const artifacts_1 = require("@sotaoi/contracts/artifacts");
const auth_maintainer_form_1 = require("@sotaoi/client/services/control-panel-service/components/gate-layout/forms/maintainer/auth-maintainer-form");
const input_field_1 = require("@sotaoi/client/forms/fields/input-field");
const validation_queries_1 = require("@sotaoi/client/services/control-panel-service/queries/validation-queries");
class AuthMaintainerView extends components_1.ViewComponent {
    promises() {
        return {
            validations: validation_queries_1.getMaintainerFormValidations(),
        };
    }
    init({ results, props }) {
        const authMaintainerFormConstructor = forms_1.FormConstructor({
            email: input_field_1.InputField.input(''),
            password: input_field_1.InputField.input(''),
        }, results.validations);
        const Form = forms_1.AuthFormFactory(new artifacts_1.Artifacts(), 'sotaoi-maintainer', authMaintainerFormConstructor, 'test:password:email:username');
        Form.init();
        react_1.default.useEffect(() => {
            return () => {
                Form.unmount();
            };
        }, []);
        Form.onAuthSuccess((result) => __awaiter(this, void 0, void 0, function* () {
            // do nothing (will be redirected by router rules)
        }));
        return { form: Form };
    }
    web(data) {
        return react_1.default.createElement(auth_maintainer_form_1.AuthMaintainerForm, Object.assign({}, this.init(data)));
    }
    mobile(data) {
        // nothing here yet
        return null;
    }
    electron(data) {
        // nothing here yet
        return null;
    }
}
exports.AuthMaintainerView = AuthMaintainerView;
