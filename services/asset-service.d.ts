import { StorageDriver } from '@sotaoi/storage-driver';
declare class AssetService extends StorageDriver {
    constructor(storageUrl: string, clientId: string, clientKey: string, preferSecure: boolean);
}
export { AssetService };
