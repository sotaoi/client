import { app } from '@sotaoi/client/app-kernel';
import { SocketContract } from '@sotaoi/contracts/http/socket-contract';

const socket = (): SocketContract => app().get<SocketContract>('app.system.socket');

export { socket };
