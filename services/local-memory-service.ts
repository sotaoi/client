// import type { AsyncStorageStatic } from '@react-native-community/async-storage';
import { LocalMemory } from '@sotaoi/omni/contracts/local-memory-contract';
import { Helper } from '@sotaoi/client/helper';

class LocalMemoryService extends LocalMemory {
  protected allowedKeys: string[];
  // protected asyncStorage: null | AsyncStorageStatic;
  protected asyncStorage: any;

  // constructor(allowedKeys: string[], asyncStorage: null | AsyncStorageStatic) {
  constructor(allowedKeys: string[], asyncStorage: any) {
    super();
    this.allowedKeys = allowedKeys;
    this.asyncStorage = asyncStorage;
  }

  public async set(key: string, value: any): Promise<void> {
    this.checkKey(key);
    await this._set(key, value);
  }

  public async get(key: string): Promise<any> {
    this.checkKey(key);
    return this._get(key);
  }

  public async remove(key: string): Promise<void> {
    this.checkKey(key);
    await this._remove(key);
  }

  protected async _set(key: string, value: any): Promise<void> {
    const stringified = JSON.stringify({ v: value });
    switch (true) {
      case Helper.isWeb():
        window.localStorage.setItem(key, stringified);
        break;
      case Helper.isMobile():
        this.asyncStorage && (await this.asyncStorage.setItem(key, stringified));
        break;
      case Helper.isElectron():
        console.warn('no electron yet');
        break;
      default:
        throw new Error('Unknown environment');
    }
  }

  protected async _get(key: string): Promise<any> {
    let value: null | string = null;
    switch (true) {
      case Helper.isWeb():
        value = window.localStorage.getItem(key) || null;
        break;
      case Helper.isMobile():
        value = (this.asyncStorage && (await this.asyncStorage.getItem(key))) || null;
        break;
      case Helper.isElectron():
        throw new Error('No electron yet');
      default:
        throw new Error('Unknown environment');
    }
    if (typeof value !== 'string') {
      return value;
    }
    try {
      return JSON.parse(value).v || null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  protected async _remove(key: string): Promise<void> {
    switch (true) {
      case Helper.isWeb():
        window.localStorage.removeItem(key);
        break;
      case Helper.isMobile():
        this.asyncStorage && (await this.asyncStorage.removeItem(key));
        break;
      case Helper.isElectron():
        throw new Error('No electron yet');
      default:
        throw new Error('Unknown environment');
    }
  }

  protected checkKey(key: string): void {
    if (this.allowedKeys.indexOf(key) === -1) {
      throw new Error(`storage key '${key}' not allowed`);
    }
  }
}

export { LocalMemoryService };
