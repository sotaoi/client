/// <reference types="react" />
import { BaseField, FieldInit, FieldConstructor } from '@sotaoi/client-forms/fields/base-field';
import { BaseForm } from '@sotaoi/client-forms/form-classes/base-form';
import { InputValidatorContract } from '@sotaoi/contracts/http/input-validator-contract';
import { BaseInput } from '@sotaoi/input/base-input';
interface SingleCollectionConstructor {
    type: 'singleCollection';
    fields: {
        [key: string]: FieldConstructor | CollectionConstructor | SingleCollectionConstructor;
    };
    values: {
        [key: string]: FieldConstructor | CollectionConstructor | SingleCollectionConstructor;
    };
}
interface CollectionConstructor {
    type: 'collection';
    min: number;
    max: number;
    fields: {
        [key: string]: FieldConstructor | CollectionConstructor | SingleCollectionConstructor;
    };
    values: {
        [key: string]: FieldConstructor | CollectionConstructor | SingleCollectionConstructor;
    }[];
}
declare class SingleCollectionField extends BaseField<any> {
    type: 'singleCollection';
    form: BaseForm;
    fields: {
        [key: string]: BaseField<any>;
    };
    values: {
        [key: string]: FieldConstructor | CollectionConstructor | SingleCollectionConstructor;
    };
    standardFields: () => {
        [key: string]: BaseField<any>;
    };
    constructor(name: string, getSetState: () => (force: boolean) => void, form: BaseForm, key: string, getFormValidation: () => InputValidatorContract<(key: string) => void | null | BaseInput<any, any>>, standardFields: {
        [key: string]: FieldConstructor | CollectionConstructor | SingleCollectionConstructor;
    }, values: {
        [key: string]: FieldConstructor | CollectionConstructor | SingleCollectionConstructor;
    });
    init(): FieldInit;
    set(values: {
        [key: string]: FieldConstructor | CollectionConstructor | SingleCollectionConstructor;
    }): void;
    clear(): void;
    getFields(): {
        [key: string]: BaseField<any>;
    };
    isEmpty(): boolean;
    convert(value: any): any;
    getInputValue(value?: any): null;
    wasChanged(): boolean;
    assignValues(): void;
    initialState(props: any): any;
    setValue(context: React.Component<any, any>): void;
    getValue(context: React.Component<any, any>): any;
    render(context: React.Component<any, any>): null | React.ReactElement;
}
declare class CollectionField extends BaseField<any> {
    type: 'collection';
    form: BaseForm;
    min: null | number;
    max: null | number;
    fields: {
        [key: string]: BaseField<any>;
    }[];
    values: {
        [key: string]: FieldConstructor | CollectionConstructor | SingleCollectionConstructor;
    }[];
    standardFields: () => {
        [key: string]: BaseField<any>;
    };
    constructor(name: string, getSetState: () => (force: boolean) => void, form: BaseForm, key: string, getFormValidation: () => InputValidatorContract<(key: string) => void | null | BaseInput<any, any>>, min: null | number, max: null | number, standardFields: {
        [key: string]: FieldConstructor | CollectionConstructor | SingleCollectionConstructor;
    }, values: {
        [key: string]: FieldConstructor | CollectionConstructor | SingleCollectionConstructor;
    }[]);
    getSizeErrors(): string[];
    init(): FieldInit;
    set(values: {
        [key: string]: FieldConstructor | CollectionConstructor | SingleCollectionConstructor;
    }[]): void;
    static ok(): string;
    clear(): void;
    getFieldGroups(): {
        [key: string]: BaseField<any>;
    }[];
    addGroup(): void;
    reindex(from: number, to: number): void;
    canAddGroup(): boolean;
    canRemoveGroup(index: number): boolean;
    removeGroup(index: number): void;
    assignValues(collectionFieldGroup: {
        [key: string]: BaseField<any>;
    }, values: null | {
        [key: string]: any;
    }): void;
    wasChanged(): boolean;
    convert(value: any): any;
    isEmpty(): boolean;
    getInputValue(input: any): null;
    protected _addGroup(values: null | {
        [key: string]: any;
    }): void;
    initialState(props: any): any;
    setValue(context: React.Component<any, any>): void;
    getValue(context: React.Component<any, any>): any;
    render(context: React.Component<any, any>): null | React.ReactElement;
}
export { SingleCollectionField, CollectionField };
export type { SingleCollectionConstructor, CollectionConstructor };
