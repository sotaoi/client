import { CSSProperties } from 'react';
import { BaseForm } from '@sotaoi/client/forms/form-classes/base-form';
import { Artifacts } from '@sotaoi/contracts/artifacts';
import { FormConstructor } from '@sotaoi/client/forms';
declare class AuthForm extends BaseForm {
    FormComponent: React.FunctionComponent<{
        children: any;
        formStyle?: CSSProperties;
        noFormElement?: boolean;
    }>;
    strategy: string;
    submit: () => void;
    constructor(formId: string, artifacts: Artifacts, repository: string, fields: FormConstructor, strategy: string, destroy: () => undefined);
}
export { AuthForm };
