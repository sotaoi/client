import { BaseForm } from '@sotaoi/client/forms/form-classes/base-form';
import { BaseField, FieldConstructor } from '@sotaoi/client/forms/fields/base-field';
import { SingleCollectionConstructor, CollectionConstructor } from '@sotaoi/client/forms/fields/collection-field';
declare const assignFields: (form: BaseForm, prefix: string, fields: {
    [key: string]: FieldConstructor | CollectionConstructor | SingleCollectionConstructor;
}) => {
    [key: string]: BaseField<any, any, any>;
};
export { assignFields };
