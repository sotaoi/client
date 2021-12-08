import { app } from '@sotaoi/client/app-kernel';
import { LangContract } from '@sotaoi/contracts/http/lang-contract';

const lang = (): LangContract => app().get<LangContract>('app.system.lang');

export { lang };
