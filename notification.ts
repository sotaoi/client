import { app } from '@sotaoi/client/app-kernel';
import { Notification } from '@sotaoi/omni/contracts/notification';

const notification = (): Notification => app().get<Notification>('app.system.notification');

export { notification };
