import { CSSProperties } from 'react';
import { BaseForm } from '@sotaoi/client/forms/form-classes/base-form';
import { AuthRecord, Artifacts } from '@sotaoi/contracts/artifacts';
import { FormConstructor } from '@sotaoi/client/forms';
declare class UpdateForm extends BaseForm {
    FormComponent: React.FunctionComponent<{
        children: any;
        formStyle?: CSSProperties;
        noFormElement?: boolean;
    }>;
    uuid: string;
    submit: () => void;
    constructor(formId: string, authRecord: null | AuthRecord, artifacts: Artifacts, role: null | string, repository: string, fields: FormConstructor, uuid: string, destroy: () => undefined);
}
export { UpdateForm };
