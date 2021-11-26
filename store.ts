import { app } from '@sotaoi/client/app-kernel';
import { StoreContract } from '@sotaoi/contracts/http/store-contract';

const store = (): StoreContract => app().get<StoreContract>('app.system.store');

export { store };
