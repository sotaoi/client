import { CSSProperties } from 'react';
import { BaseForm } from '@sotaoi/client-forms/form-classes/base-form';
import { Artifacts, AuthRecord } from '@sotaoi/contracts/artifacts';
import { FormConstructor } from '@sotaoi/client-forms/form-factories';
declare class TaskForm extends BaseForm {
    FormComponent: React.FunctionComponent<{
        children: any;
        formStyle?: CSSProperties;
        noFormElement?: boolean;
    }>;
    task: string;
    submit: () => void;
    constructor(formId: string, authRecord: null | AuthRecord, artifacts: Artifacts, role: null | string, repository: string, task: string, fields: FormConstructor, destroy: () => undefined);
}
export { TaskForm };
