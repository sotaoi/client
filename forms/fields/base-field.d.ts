import React from 'react';
import { InputValidator } from '@sotaoi/contracts/http/input-validator-contract';
import { BaseInput, FieldValidation } from '@sotaoi/input/base-input';
import type { CollectionField as CollectionFieldType } from '@sotaoi/client/forms/fields/collection-field';
interface FieldConstructor {
    type: typeof BaseField;
    value: any;
    validations: any;
}
interface FieldInit {
    [key: string]: any;
    value: any;
    onChange: (ev: any) => void;
    onBlur: (ev: any) => void;
    onKeyUp?: (ev: any) => void;
}
declare abstract class BaseComponent<ValueType, ComponentProps, ComponentState> extends React.Component<ComponentProps, ComponentState> {
    abstract setValue(input: ValueType): void;
    abstract getValue(): any;
}
declare abstract class BaseField<ValueType, ComponentProps = any, ComponentState = any> {
    abstract init(): FieldInit;
    abstract set(value: ValueType): void;
    abstract clear(): void;
    abstract isEmpty(): boolean;
    abstract convert(value: any): ValueType;
    abstract getInputValue(input?: ValueType): any;
    abstract wasChanged(): boolean;
    abstract initialState(props: ComponentProps): ComponentState;
    abstract setValue(input: ValueType, context: React.Component<ComponentProps, ComponentState>): void;
    abstract getValue(context: React.Component<ComponentProps, ComponentState>): any;
    abstract render(context: React.Component<ComponentProps, ComponentState>): null | React.ReactElement;
    renderUuid: string;
    name: string;
    readonly key: string;
    getFormValidation: () => InputValidator<(key: string) => void | null | BaseInput<any, any>>;
    validations: null | FieldValidation[];
    rerender: (force?: boolean) => void;
    value: ValueType;
    initialValue: ValueType;
    touched: boolean;
    _ref: null | BaseComponent<ValueType, ComponentProps, ComponentState>;
    component: React.ComponentClass<ComponentProps | {
        [key: string]: any;
    }> | React.FunctionComponent<ComponentProps | {
        [key: string]: any;
    }>;
    constructor(name: string, key: string, getFormValidation: () => InputValidator<(key: string) => void | null | BaseInput<any, any>>, validations: null | FieldValidation[], getRerender: () => (force: boolean) => void, value: ValueType);
    asset(item: null | string, role?: string): null | string;
    assets(items: null | string, role?: string): null | string[];
    getKey(index: number): string;
    validate(): Promise<void>;
    isValid(): boolean;
    getErrors(): string[];
    setTouched(touched: boolean): void;
    wasTouched(): boolean;
    collection(): CollectionFieldType;
    addGroup(): void;
    canRemoveGroup(index: number): boolean;
    removeGroup(index: number): void;
    static input(value: any): {
        input: BaseInput<any, any>;
        field: typeof BaseField;
    };
}
export { BaseField };
export type { FieldInit, FieldConstructor };
