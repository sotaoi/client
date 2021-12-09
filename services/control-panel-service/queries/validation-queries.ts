import { RequestAbortHandler } from '@sotaoi/client/components';
import { FormValidations } from '@sotaoi/input/base-input';
import { controlPanelForms } from '@sotaoi/client/services/control-panel-service/control-panel-forms';

const getMaintainerFormValidations = () => {
  return (props: { [key: string]: any }, requestAbortHandler: RequestAbortHandler): Promise<FormValidations> =>
    controlPanelForms['auth-maintainer-form']();
};

export { getMaintainerFormValidations };
