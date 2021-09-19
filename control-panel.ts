import { app } from '@sotaoi/client/app-kernel';
import { ControlPanelService } from '@sotaoi/client/services/control-panel-service';

const controlPanel = (): ControlPanelService => app().get<ControlPanelService>('app.system.controlPanel');

export { controlPanel };
