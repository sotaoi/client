import React from 'react';
import { RouteComponent, RouteData } from '@sotaoi/client/components';
import { AuthMaintainerView } from '@sotaoi/client/services/control-panel-service/components/gate-layout/views/maintainer/auth-maintainer-view';

interface AuthMaintainerRouteProps {
  //
}
class AuthMaintainerRoute extends RouteComponent<AuthMaintainerRouteProps> {
  public display(props: RouteData<AuthMaintainerRouteProps>): null | React.ReactElement {
    return <AuthMaintainerView />;
  }

  public web(props: RouteData<AuthMaintainerRouteProps>): null | React.ReactElement {
    return this.display(props);
  }

  public mobile(props: RouteData<AuthMaintainerRouteProps>): null | React.ReactElement {
    return null;
  }

  public electron(props: RouteData<AuthMaintainerRouteProps>): null | React.ReactElement {
    return null;
  }
}

export { AuthMaintainerRoute };
