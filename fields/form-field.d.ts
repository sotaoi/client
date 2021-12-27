import React from 'react';
import { BaseField, FieldInit } from '@sotaoi/client-forms/fields/base-field';
import { BaseInput, FieldValidation } from '@sotaoi/input/base-input';
import { FormInput } from '@sotaoi/input/form-input';
import { InputValidatorContract } from '@sotaoi/contracts/http/input-validator-contract';
interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    onChange: (ev: any) => void;
    value: any;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    keyboardType?: any;
    secureTextEntry?: boolean;
}
interface ComponentState {
    value: any;
}
declare class InputField<ComponentProps extends InputProps> extends BaseField<FormInput, ComponentProps, ComponentState> {
    constructor(name: string, key: string, getFormValidation: () => InputValidatorContract<(key: string) => void | null | BaseInput<any, any>>, validations: FieldValidation[], getRerender: () => (force: boolean) => void, value: FormInput);
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
export { InputField };
export { FormInput } from '@sotaoi/input/form-input';
