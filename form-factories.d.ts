import { StoreForm } from '@sotaoi/client-forms/form-classes/store-form';
import { UpdateForm } from '@sotaoi/client-forms/form-classes/update-form';
import { AuthForm } from '@sotaoi/client-forms/form-classes/auth-form';
import { AuthRecord, Artifacts } from '@sotaoi/contracts/artifacts';
import { FormValidations } from '@sotaoi/input/base-input';
import { FieldConstructor } from '@sotaoi/client-forms/fields/base-field';
import { SingleCollectionConstructor, CollectionConstructor } from '@sotaoi/client-forms/fields/collection-field';
import { TaskForm } from '@sotaoi/client-forms/form-classes/task-form';
interface FormConstructor {
    constructors: {
        [key: string]: FieldConstructor | CollectionConstructor | SingleCollectionConstructor;
    };
    validations: FormValidations;
}
declare const StoreFormFactory: (authRecord: null | AuthRecord, artifacts: Artifacts, role: null | string, repository: string, fields: FormConstructor) => StoreForm;
declare const UpdateFormFactory: (authRecord: null | AuthRecord, artifacts: Artifacts, role: null | string, repository: string, fields: FormConstructor, uuid: string) => UpdateForm;
declare const AuthFormFactory: (artifacts: Artifacts, repository: string, fields: FormConstructor, strategy: string) => AuthForm;
declare const TaskFormFactory: (authRecord: null | AuthRecord, artifacts: Artifacts, role: null | string, repository: string, task: string, fields: FormConstructor) => TaskForm;
declare const FormConstructor: (init: {
    [key: string]: any;
}, validations: FormValidations) => FormConstructor;
export { StoreFormFactory, UpdateFormFactory, AuthFormFactory, TaskFormFactory, FormConstructor };
