import { app } from '@sotaoi/client/app-kernel';
import { Socket } from '@sotaoi/omni/contracts/socket';

const socket = (): Socket => app().get<Socket>('app.system.socket');

export { socket };
