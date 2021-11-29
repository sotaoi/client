import { RoutesConfig } from '@sotaoi/contracts/state';
import { ControlPanel } from '@sotaoi/contracts/http/control-panel-contract';
declare class ControlPanelService extends ControlPanel {
    getRoutesConfigGate(prefix: string): RoutesConfig;
    getRoutesConfigMain(prefix: string): RoutesConfig;
}
export { ControlPanelService };
