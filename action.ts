import { app } from '@sotaoi/client/app-kernel';
import { ActionContract } from '@sotaoi/contracts/http/action-contract';

const action = (): ActionContract => app().get<ActionContract>('app.system.action');

export { action };
