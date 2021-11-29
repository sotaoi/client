import React from 'react';
import { BaseField, FieldInit } from '@sotaoi/client/forms/fields/base-field';
import { FieldValidation, BaseInput } from '@sotaoi/input/base-input';
import { MultiFileInput, MultiFileFieldType } from '@sotaoi/input/multi-file-input';
import { FileInput } from '@sotaoi/input/file-input';
import { InputValidator } from '@sotaoi/contracts/http/input-validator-contract';
interface ComponentProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    value: any;
}
interface ComponentState {
    value: File[];
}
declare class MultiFileField extends BaseField<MultiFileInput, ComponentProps, ComponentState> {
    ref: null | HTMLInputElement;
    constructor(name: string, key: string, getFormValidation: () => InputValidator<(key: string) => void | null | BaseInput<any, any>>, validations: FieldValidation[], getRerender: () => (force: boolean) => void, value: MultiFileInput);
    init(): FieldInit;
    clear(): void;
    isEmpty(): boolean;
    set(value: [] | MultiFileInput): void;
    convert(value: null | string | MultiFileInput | MultiFileFieldType): MultiFileInput;
    getInputValue(input?: MultiFileInput): FileInput[];
    wasChanged(): boolean;
    getPreviews(): string[];
    initialState(props: ComponentProps): ComponentState;
    setValue(input: MultiFileInput, context: React.Component<ComponentProps, ComponentState>): void;
    getValue(context: React.Component<ComponentProps, ComponentState>): File[];
    render(context: React.Component<ComponentProps, ComponentState>): null | React.ReactElement;
    static getDerivedStateFromProps(nextProps: {
        [key: string]: any;
    }, state: {
        [key: string]: any;
    }): null | {
        [key: string]: any;
    };
}
export { MultiFileField, MultiFileInput };
