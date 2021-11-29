import React from 'react';
import { BaseField, FieldInit } from '@sotaoi/client/forms/fields/base-field';
import { BaseInput, FieldValidation } from '@sotaoi/input/base-input';
import { FileInput, FileValue, FileFieldType } from '@sotaoi/input/file-input';
import { InputValidator } from '@sotaoi/contracts/http/input-validator-contract';
declare type ComponentStateValue = null | File;
interface ComponentProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    value: any;
}
interface ComponentState {
    value: ComponentStateValue;
}
declare class FileField extends BaseField<FileInput, ComponentProps, ComponentState> {
    ref: null | HTMLInputElement;
    constructor(name: string, key: string, getFormValidation: () => InputValidator<(key: string) => void | null | BaseInput<any, any>>, validations: FieldValidation[], getRerender: () => (force: boolean) => void, value: FileInput);
    init(): FieldInit;
    clear(): void;
    isEmpty(): boolean;
    set(value: FileInput): void;
    convert(value: null | string | FileInput | FileFieldType): FileInput;
    getInputValue(input?: FileInput): FileValue;
    wasChanged(): boolean;
    getPreview(): string;
    initialState(props: ComponentProps): ComponentState;
    setValue(input: FileInput, context: React.Component<ComponentProps, ComponentState>): void;
    getValue(context: React.Component<ComponentProps, ComponentState>): ComponentStateValue;
    render(context: React.Component<ComponentProps, ComponentState>): null | React.ReactElement;
    static getDerivedStateFromProps(nextProps: {
        [key: string]: any;
    }, state: {
        [key: string]: any;
    }): null | {
        [key: string]: any;
    };
}
export { FileField, FileInput };
