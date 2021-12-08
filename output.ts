import { app } from '@sotaoi/client/app-kernel';
import { OutputContract } from '@sotaoi/contracts/http/output-contract';

const output = (): OutputContract => app().get<OutputContract>('app.system.output');

export { output };
