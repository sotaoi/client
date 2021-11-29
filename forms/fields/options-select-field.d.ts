import React from 'react';
import { BaseField, FieldInit } from '@sotaoi/client/forms/fields/base-field';
import { FieldValidation, BaseInput } from '@sotaoi/input/base-input';
import { OptionsSelectInput, OptionsSelectValue } from '@sotaoi/input/options-select-input';
import { InputValidator } from '@sotaoi/contracts/http/input-validator-contract';
interface ComponentProps {
    onChange: (ev: any) => void;
    render: (values: OptionsSelectValue, onChange: (option: string, value: boolean) => () => void) => null | React.ReactElement;
    value: OptionsSelectValue;
}
interface ComponentState {
    value: OptionsSelectValue;
}
declare class OptionsSelectField extends BaseField<OptionsSelectInput, ComponentProps, ComponentState> {
    options: string[];
    constructor(name: string, key: string, getFormValidation: () => InputValidator<(key: string) => void | null | BaseInput<any, any>>, validations: FieldValidation[] | undefined, getRerender: () => (force: boolean) => void, value: OptionsSelectInput);
    init(): FieldInit;
    clear(): void;
    isEmpty(): boolean;
    set(value: string | OptionsSelectValue | OptionsSelectInput): void;
    convert(value: string | OptionsSelectValue | OptionsSelectInput): OptionsSelectInput;
    getInputValue(input?: OptionsSelectInput): OptionsSelectValue;
    wasChanged(): boolean;
    initialState(props: ComponentProps): ComponentState;
    setValue(input: OptionsSelectInput, context: React.Component<ComponentProps, ComponentState>): void;
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
export { OptionsSelectField, OptionsSelectInput };
