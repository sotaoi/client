import { RequestAbortHandler } from '@sotaoi/client/components';
import { FormValidations } from '@sotaoi/input/base-input';
declare const getMaintainerFormValidations: () => (props: {
    [key: string]: any;
}, requestAbortHandler: RequestAbortHandler) => Promise<FormValidations>;
export { getMaintainerFormValidations };
