import { app } from '@sotaoi/client/app-kernel';
import { Lang } from '@sotaoi/contracts/http/lang-contract';

const lang = (): Lang => app().get<Lang>('app.system.lang');

export { lang };
