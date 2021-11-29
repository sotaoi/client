import React from 'react';
import { ViewComponent, ViewData, ViewPromises } from '@sotaoi/client/components';
import { AuthForm } from '@sotaoi/client/forms/form-classes/auth-form';
interface AuthMaintainerViewProps {
}
declare class AuthMaintainerView extends ViewComponent<AuthMaintainerViewProps> {
    promises(): ViewPromises<AuthMaintainerViewProps>;
    init({ results, props }: ViewData<AuthMaintainerViewProps>): {
        form: AuthForm;
    };
    web(data: ViewData<AuthMaintainerViewProps>): null | React.ReactElement;
    mobile(data: ViewData<AuthMaintainerViewProps>): null | React.ReactElement;
    electron(data: ViewData<AuthMaintainerViewProps>): null | React.ReactElement;
}
export { AuthMaintainerView };
