import React from 'react';
import { BaseField, FieldInit } from '@sotaoi/client/forms/fields/base-field';
import { BaseInput, FieldValidation } from '@sotaoi/input/base-input';
import { StringInput } from '@sotaoi/input/string-input';
import { InputValidator } from '@sotaoi/contracts/http/input-validator-contract';
import { KeyboardType } from 'react-native';
interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    onChange: (ev: any) => void;
    value: string;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    keyboardType?: KeyboardType;
    secureTextEntry?: boolean;
}
interface ComponentState {
    value: null | string;
}
declare class InputField<ComponentProps extends InputProps> extends BaseField<StringInput, ComponentProps, ComponentState> {
    constructor(name: string, key: string, getFormValidation: () => InputValidator<(key: string) => void | null | BaseInput<any, any>>, validations: FieldValidation[], getRerender: () => (force: boolean) => void, value: StringInput);
    init(): FieldInit;
    set(input: StringInput): void;
    clear(): void;
    isEmpty(): boolean;
    convert(value: StringInput | null | string): StringInput;
    getInputValue(input?: StringInput): null | string;
    wasChanged(): boolean;
    initialState(props: ComponentProps): ComponentState;
    setValue(input: StringInput, context: React.Component<ComponentProps, ComponentState>): void;
    getValue(context: React.Component<ComponentProps, ComponentState>): null | string;
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
export { StringInput } from '@sotaoi/input/string-input';
