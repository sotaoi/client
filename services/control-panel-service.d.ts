import { RoutesConfig } from '@sotaoi/contracts/state';
import { ControlPanelContract } from '@sotaoi/contracts/http/control-panel-contract';
declare class ControlPanelService extends ControlPanelContract {
    getRoutesConfigGate(prefix: string): RoutesConfig;
    getRoutesConfigMain(prefix: string): RoutesConfig;
}
export { ControlPanelService };
