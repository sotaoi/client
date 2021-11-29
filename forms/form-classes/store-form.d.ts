import { CSSProperties } from 'react';
import { AuthRecord, Artifacts } from '@sotaoi/contracts/artifacts';
import { BaseForm } from '@sotaoi/client/forms/form-classes/base-form';
import { FormConstructor } from '@sotaoi/client/forms';
declare class StoreForm extends BaseForm {
    FormComponent: React.FunctionComponent<{
        children: any;
        formStyle?: CSSProperties;
        noFormElement?: boolean;
    }>;
    submit: () => void;
    constructor(formId: string, authRecord: null | AuthRecord, artifacts: Artifacts, role: null | string, repository: string, fields: FormConstructor, destroy: () => void);
}
export { StoreForm };
