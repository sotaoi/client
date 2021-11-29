import { LocalMemory } from '@sotaoi/contracts/http/local-memory-contract';
declare class LocalMemoryService extends LocalMemory {
    protected allowedKeys: string[];
    protected asyncStorage: any;
    constructor(allowedKeys: string[], asyncStorage: any);
    set(key: string, value: any): Promise<void>;
    get(key: string): Promise<any>;
    remove(key: string): Promise<void>;
    protected _set(key: string, value: any): Promise<void>;
    protected _get(key: string): Promise<any>;
    protected _remove(key: string): Promise<void>;
    protected checkKey(key: string): void;
}
export { LocalMemoryService };
