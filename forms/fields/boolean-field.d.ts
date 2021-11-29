import React from 'react';
import { BaseField, FieldInit } from '@sotaoi/client/forms/fields/base-field';
import { FieldValidation, BaseInput } from '@sotaoi/input/base-input';
import { BooleanInput } from '@sotaoi/input/boolean-input';
import { InputValidator } from '@sotaoi/contracts/http/input-validator-contract';
interface ComponentProps {
    onChange: (ev: any) => void;
    render: (value: boolean, setValue: (value: boolean) => void) => null | React.ReactElement;
    value: boolean;
}
interface ComponentState {
    value: boolean;
}
declare class BooleanField extends BaseField<BooleanInput, ComponentProps, ComponentState> {
    constructor(name: string, key: string, getFormValidation: () => InputValidator<(key: string) => void | null | BaseInput<any, any>>, validations: FieldValidation[] | undefined, getRerender: () => (force: boolean) => void, value: BooleanInput);
    init(): FieldInit;
    clear(): void;
    isEmpty(): boolean;
    set(value: string | boolean | BooleanInput): void;
    convert(value: string | boolean | BooleanInput): BooleanInput;
    getInputValue(input?: BooleanInput): boolean;
    wasChanged(): boolean;
    initialState(props: ComponentProps): ComponentState;
    setValue(input: BooleanInput, context: React.Component<ComponentProps, ComponentState>): void;
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
export { BooleanField, BooleanInput };
