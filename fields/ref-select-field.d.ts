import React from 'react';
import { BaseField, FieldInit } from '@sotaoi/client-forms/fields/base-field';
import { FieldValidation, BaseInput } from '@sotaoi/input/base-input';
import { RefSelectInput, RefSelectValue } from '@sotaoi/input/ref-select-input';
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
declare class RefSelectField extends BaseField<RefSelectInput, ComponentProps, ComponentState> {
    webRef: null | HTMLSelectElement;
    mobileRef: any;
    constructor(name: string, key: string, getFormValidation: () => InputValidatorContract<(key: string) => void | null | BaseInput<any, any>>, validations: FieldValidation[] | undefined, getRerender: () => (force: boolean) => void, value: RefSelectInput);
    init(): FieldInit;
    clear(): void;
    isEmpty(): boolean;
    set(value: RefSelectInput | string): void;
    convert(value: RefSelectInput | null | string): RefSelectInput;
    getInputValue(input?: RefSelectInput): RefSelectValue;
    wasChanged(): boolean;
    initialState(props: ComponentProps): ComponentState;
    setValue(input: RefSelectInput, context: React.Component<ComponentProps, ComponentState>): void;
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
export { RefSelectField, RefSelectInput };
