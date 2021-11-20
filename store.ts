import { app } from '@sotaoi/client/app-kernel';
import { StoreContract } from '@sotaoi/omni/contracts/store-contract';

const store = (): StoreContract => app().get<StoreContract>('app.system.store');

export { store };
