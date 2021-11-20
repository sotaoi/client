import React from 'react';
import { RoutesConfig } from '@sotaoi/omni/state';
import { ControlPanel } from '@sotaoi/omni/contracts/control-panel-contract';
import { Helper } from '@sotaoi/client/helper';
import { store } from '@sotaoi/client/store';
import { GateLayout } from '@sotaoi/client/services/control-panel-service/components/gate-layout/gate-layout';
import { MainLayout } from '@sotaoi/client/services/control-panel-service/components/main-layout/main-layout';
import { redirect } from '@sotaoi/client/router';
import { AuthMaintainerView } from '@sotaoi/client/services/control-panel-service/components/gate-layout/views/maintainer/auth-maintainer-view';

class ControlPanelService extends ControlPanel {
  public getRoutesConfigGate(prefix: string): RoutesConfig {
    prefix = '/' + Helper.trim('/', prefix) + '/gate';

    return {
      prefix,
      layout: GateLayout,
      routes: {
        '/': AuthMaintainerView,
      },
      condition: (): boolean => {
        const authRecord = store().getAuthRecord();
        if (authRecord && authRecord.domainSignature === store().sdriverDomainSignature()) {
          return false;
        }
        return Helper.isWeb();
      },
    };
  }

  public getRoutesConfigMain(prefix: string): RoutesConfig {
    prefix = '/' + Helper.trim('/', prefix);

    return {
      prefix,
      layout: MainLayout,
      routes: {
        '/': (props: { [key: string]: any }): null | React.ReactElement => {
          return <div>ok control panel</div>;
        },
      },
      condition: (): boolean => {
        const authRecord = store().getAuthRecord();
        if (!authRecord || authRecord.domainSignature !== store().sdriverDomainSignature()) {
          redirect(prefix + '/gate');
          return false;
        }
        return Helper.isWeb();
      },
    };
  }
}

export { ControlPanelService };
