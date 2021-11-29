import React from 'react';
import { BaseField, FieldInit } from '@sotaoi/client/forms/fields/base-field';
import { BaseInput, FieldValidation } from '@sotaoi/input/base-input';
import { FormInput } from '@sotaoi/input/form-input';
import { InputValidator } from '@sotaoi/contracts/http/input-validator-contract';
interface FormFieldHandler {
    value: any;
    change: (value: any) => any;
    pocket: {
        [key: string]: any;
    };
}
interface FormFieldProps {
    onChange: (ev: any) => void;
    render: (handler: FormFieldHandler) => null | React.ReactElement;
    pocket?: {
        [key: string]: any;
    };
}
interface ComponentState {
    value: any;
}
declare class FormField<ComponentProps extends FormFieldProps> extends BaseField<FormInput, ComponentProps, ComponentState> {
    pocket: {
        [key: string]: any;
    };
    constructor(name: string, key: string, getFormValidation: () => InputValidator<(key: string) => void | null | BaseInput<any, any>>, validations: FieldValidation[], getRerender: () => (force: boolean) => void, value: FormInput);
    init(): FieldInit;
    set(input: FormInput): void;
    clear(): void;
    isEmpty(): boolean;
    convert(value: FormInput | any): FormInput;
    getInputValue(input?: FormInput): any;
    wasChanged(): boolean;
    initialState(props: ComponentProps): ComponentState;
    setValue(input: FormInput, context: React.Component<ComponentProps, ComponentState>): void;
    getValue(context: React.Component<ComponentProps, ComponentState>): any;
    render(context: React.Component<ComponentProps, ComponentState>): null | React.ReactElement;
    static getDerivedStateFromProps(nextProps: {
        [key: string]: any;
    }, state: {
        [key: string]: any;
    }): null | {
        [key: string]: any;
    };
}
export { FormField };
export type { FormFieldHandler };
