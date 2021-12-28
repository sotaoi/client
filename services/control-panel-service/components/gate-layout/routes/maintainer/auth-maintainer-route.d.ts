import React from 'react';
import { RouteComponent, RouteData } from '@sotaoi/client/components';
interface AuthMaintainerRouteProps {
}
declare class AuthMaintainerRoute extends RouteComponent<AuthMaintainerRouteProps> {
    display(props: RouteData<AuthMaintainerRouteProps>): null | React.ReactElement;
    web(props: RouteData<AuthMaintainerRouteProps>): null | React.ReactElement;
    mobile(props: RouteData<AuthMaintainerRouteProps>): null | React.ReactElement;
    electron(props: RouteData<AuthMaintainerRouteProps>): null | React.ReactElement;
}
export { AuthMaintainerRoute };
