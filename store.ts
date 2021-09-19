import { app } from '@sotaoi/client/app-kernel';
import { Store } from '@sotaoi/omni/contracts/store';

const store = (): Store => app().get<Store>('app.system.store');

export { store };
