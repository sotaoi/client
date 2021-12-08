import { app } from '@sotaoi/client/app-kernel';
import { LocalMemoryContract } from '@sotaoi/contracts/http/local-memory-contract';

const memory = (): LocalMemoryContract => app().get<LocalMemoryContract>('app.system.localMemory');

export { memory };
