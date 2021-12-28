import { app } from '@sotaoi/client/app-kernel';
import { SettingsService } from '@sotaoi/client/services/settings-service';

const settings = (): SettingsService => app().get<SettingsService>('app.system.settings');

export { settings };
