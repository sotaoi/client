import React from 'react';
import { BaseField, FieldConstructor } from '@sotaoi/client/forms/fields/base-field';
import { CommandResult, AuthResult, TaskResult } from '@sotaoi/contracts/transactions';
import { AuthRecord, Artifacts } from '@sotaoi/contracts/artifacts';
import { BaseInput, FormValidations } from '@sotaoi/input/base-input';
import { SingleCollectionConstructor, CollectionConstructor } from '@sotaoi/client/forms/fields/collection-field';
import { InputValidator } from '@sotaoi/contracts/http/input-validator-contract';
interface FormState {
    getFields: () => {
        [key: string]: BaseField<any>;
    };
    canSubmit: boolean;
    valid: boolean;
    sending: boolean;
    validating: boolean;
    errors: string;
    apiErrors: string;
}
declare abstract class BaseForm {
    abstract FormComponent: React.FunctionComponent<{
        children: any;
    }>;
    formId: string;
    authRecord: null | AuthRecord;
    artifacts: Artifacts;
    role: null | string;
    repository: string;
    serializedDescriptors: string;
    uuid: null | string;
    strategy: null | string;
    task: null | string;
    fieldConstructors: {
        [key: string]: FieldConstructor | CollectionConstructor | SingleCollectionConstructor;
    };
    fields: {
        [key: string]: BaseField<any>;
    };
    formValidation: InputValidator<(key: string) => void | null | BaseInput<any, any>>;
    unmounted: boolean;
    validations: FormValidations;
    setState: <StateType = {
        [key: string]: any;
    }>(state: StateType) => void;
    getState: () => {
        [key: string]: any;
    };
    rerender: (force: boolean) => void;
    onCommandSuccess: (onCommandSuccessFn: (result: CommandResult) => Promise<any>) => void;
    onAuthSuccess: (onAuthSuccessFn: (result: AuthResult) => Promise<any>) => void;
    onTaskSuccess: (onTaskSuccessFn: (result: TaskResult) => Promise<any>) => void;
    destroy: () => void;
    static NOTIFY: boolean;
    static instances: {
        [key: string]: any;
    };
    static formSerials: {
        [key: string]: string;
    };
    protected state: null | {
        [key: string]: any;
    };
    protected initialState: null | {
        [key: string]: any;
    };
    protected _sending: boolean;
    protected _validating: boolean;
    protected _realOnCommandSuccess: (result: CommandResult) => Promise<any>;
    protected _realOnAuthSuccess: (result: AuthResult) => Promise<any>;
    protected _realOnTaskSuccess: (result: TaskResult) => Promise<any>;
    protected static inputValidator: InputValidator;
    reset: () => void;
    constructor(formId: string, authRecord: null | AuthRecord, artifacts: Artifacts, role: null | string, repository: string, fieldDescriptors: {
        constructors: {
            [key: string]: FieldConstructor | CollectionConstructor | SingleCollectionConstructor;
        };
        validations: FormValidations;
    }, destroy: () => void);
    init: (initialState?: {
        [key: string]: any;
    }) => void;
    unmount: () => void;
    resetFieldDescriptors: (fieldDescriptors: {
        constructors: {
            [key: string]: FieldConstructor | CollectionConstructor | SingleCollectionConstructor;
        };
        validations: FormValidations;
    }) => void;
    action(type: 'store' | 'update' | 'auth' | 'task'): Promise<void>;
    getFormState(): FormState;
    getFields<FieldState extends {
        [key: string]: BaseField<any>;
    } = {
        [key: string]: BaseField<any>;
    }>(): FieldState;
    static setup(inputValidator: InputValidator): void;
    protected setSending(sending: boolean): void;
    protected setValidating(validating: boolean): void;
    protected _getFormState(): FormState;
}
export { BaseForm };
