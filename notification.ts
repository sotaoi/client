import { app } from '@sotaoi/client/app-kernel';
import { NotificationContract } from '@sotaoi/contracts/http/notification-contract';

const notification = (): NotificationContract => app().get<NotificationContract>('app.system.notification');

export { notification };
