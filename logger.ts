import { app } from '@sotaoi/client/app-kernel';
import { LoggerContract } from '@sotaoi/contracts/http/logger-contract';

const logger = (): LoggerContract => app().get<LoggerContract>('app.system.logger');

export { logger };
