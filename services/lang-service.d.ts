import type { DefaultNamespace, Namespace, UseTranslationResponse } from 'react-i18next';
import { StoreContract } from '@sotaoi/contracts/http/store-contract';
import { Lang } from '@sotaoi/contracts/state';
import { Lang as LangContract } from '@sotaoi/contracts/http/lang-contract';
declare class LangService extends LangContract {
    protected available: null | Lang[];
    protected multilang: boolean;
    init(store: () => StoreContract): Promise<void>;
    isMultilang(): boolean;
    useTranslation<UseTranslationResponse>(): UseTranslationResponse;
    protected availableLangs(): Lang[];
}
export { LangService };
export type { Namespace, DefaultNamespace, UseTranslationResponse };
