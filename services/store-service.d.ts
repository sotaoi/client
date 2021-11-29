import { StoreContract } from '@sotaoi/contracts/http/store-contract';
import { Lang, State, AppInfoInterface } from '@sotaoi/contracts/state';
import { AuthRecord } from '@sotaoi/contracts/artifacts';
import { StoreCreator } from '@sotaoi/contracts/definitions/redux';
import { LocalMemory } from '@sotaoi/contracts/http/local-memory-contract';
import { InputValidator } from '@sotaoi/contracts/http/input-validator-contract';
declare class StoreService extends StoreContract {
    protected currentPath: null | string;
    protected accessToken: null | string;
    constructor(appInfo: AppInfoInterface, apiUrl: string, createStore: StoreCreator, inputValidator: InputValidator, localMemory: LocalMemory);
    init(): Promise<void>;
    setAuthRecord(authRecord: null | AuthRecord, accessToken: null | string): Promise<void>;
    setCurrentPath(currentPath: string): Promise<void>;
    getCurrentPath(): string;
    getAuthRecord(): null | AuthRecord;
    getAccessToken(): null | string;
    hasMultiLang(): boolean;
    setTitle(title: string): void;
    setSelectedLang(lang: Lang): void;
    setDefaultLang(lang: Lang): void;
    getSelectedLang(): Lang;
    getDefaultLang(): Lang;
    getAvailableLangs(): Lang[];
    getTranslations(): {
        [key: string]: {
            [key: string]: string;
        };
    };
    subscribe(callback: () => void): () => void;
    getState(): State;
    getAppInfo(): AppInfoInterface;
    getApiUrl(): string;
    driverDomainSignature(): string;
    mdriverDomainSignature(): string;
    sdriverDomainSignature(): string;
}
export { StoreService };
