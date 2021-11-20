import { app } from '@sotaoi/client/app-kernel';
import { Logger } from '@sotaoi/omni/contracts/logger-contract';

const logger = (): Logger => app().get<Logger>('app.system.logger');

export { logger };
