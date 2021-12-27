import React from 'react';
import { BaseField, FieldInit } from '@sotaoi/client-forms/fields/base-field';
import { FieldValidation, BaseInput } from '@sotaoi/input/base-input';
import { StringSelectInput, StringSelectValue } from '@sotaoi/input/string-select-input';
import { InputValidatorContract } from '@sotaoi/contracts/http/input-validator-contract';
interface ComponentProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    onChange: (ev: any) => void;
    style?: {
        [key: string]: any;
    };
    value: string;
}
interface ComponentState {
    value: string;
}
declare class StringSelectField extends BaseField<StringSelectInput, ComponentProps, ComponentState> {
    webRef: null | HTMLSelectElement;
    mobileRef: any;
    constructor(name: string, key: string, getFormValidation: () => InputValidatorContract<(key: string) => void | null | BaseInput<any, any>>, validations: FieldValidation[] | undefined, getRerender: () => (force: boolean) => void, value: StringSelectInput);
    init(): FieldInit;
    clear(): void;
    isEmpty(): boolean;
    set(value: StringSelectInput | string): void;
    convert(value: StringSelectValue | StringSelectInput): StringSelectInput;
    getInputValue(input?: StringSelectInput): string;
    wasChanged(): boolean;
    initialState(props: ComponentProps): ComponentState;
    setValue(input: StringSelectInput, context: React.Component<ComponentProps, ComponentState>): void;
    getValue(context: React.Component<ComponentProps, ComponentState>): void;
    render(context: React.Component<ComponentProps, ComponentState>): null | React.ReactElement;
    static getDerivedStateFromProps(nextProps: {
        [key: string]: any;
    }, state: {
        [key: string]: any;
    }): null | {
        [key: string]: any;
    };
}
export { StringSelectField, StringSelectInput };
