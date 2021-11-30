import { StorageDriver } from '@sotaoi/storage-driver';

class AssetService extends StorageDriver {
  constructor(storageUrl: string, clientId: string, clientKey: string, preferSecure: boolean) {
    super(storageUrl, '', clientId, clientKey, '', preferSecure);
  }
}

export { AssetService };
