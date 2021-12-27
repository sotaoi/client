import { FormValidations } from '@sotaoi/input/base-input';
declare const controlPanelForms: {
    [key: string]: () => Promise<FormValidations>;
};
export { controlPanelForms };
