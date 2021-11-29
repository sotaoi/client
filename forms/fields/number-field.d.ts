import React from 'react';
import { BaseField, FieldInit } from '@sotaoi/client/forms/fields/base-field';
import { FieldValidation, BaseInput } from '@sotaoi/input/base-input';
import { NumberInput } from '@sotaoi/input/number-input';
import { InputValidator } from '@sotaoi/contracts/http/input-validator-contract';
interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    onChange: (ev: any) => void;
    value: number;
    secureTextEntry?: boolean;
}
interface ComponentState {
    value: number;
}
declare class NumberField<ComponentProps = InputProps> extends BaseField<NumberInput, ComponentProps, ComponentState> {
    constructor(name: string, key: string, getFormValidation: () => InputValidator<(key: string) => void | null | BaseInput<any, any>>, validations: FieldValidation[], getRerender: () => (force: boolean) => void, value: NumberInput);
    init(): FieldInit;
    set(input: NumberInput): void;
    clear(): void;
    isEmpty(): boolean;
    convert(value: NumberInput | number): NumberInput;
    getInputValue(input?: NumberInput): number;
    wasChanged(): boolean;
    initialState(props: ComponentProps): ComponentState;
    setValue(input: NumberInput, context: React.Component<ComponentProps, ComponentState>): void;
    getValue(context: React.Component<ComponentProps, ComponentState>): number;
    render(context: React.Component<ComponentProps, ComponentState>): null | React.ReactElement;
    static getDerivedStateFromProps(nextProps: {
        [key: string]: any;
    }, state: {
        [key: string]: any;
    }): null | {
        [key: string]: any;
    };
}
export { NumberField, NumberInput };
