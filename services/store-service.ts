import { StoreContract } from '@sotaoi/contracts/http/store-contract';
import { Lang, State, Seed, AppInfoInterface } from '@sotaoi/contracts/state';
import { AuthRecord } from '@sotaoi/contracts/artifacts';
import { StoreCreator } from '@sotaoi/contracts/definitions/redux';
import { BaseForm } from '@sotaoi/client-forms/form-classes/base-form';
import { LocalMemoryContract } from '@sotaoi/contracts/http/local-memory-contract';
import { InputValidatorContract } from '@sotaoi/contracts/http/input-validator-contract';
import { Navigation } from '@sotaoi/client/router/navigation';
import { Helper } from '@sotaoi/client/helper';
import { memory } from '@sotaoi/client/memory';

let unsubscribe: () => void = () => undefined;

interface AppTitleAction {
  type: 'app.meta.title';
  value: string;
}
interface AuthRecordAction {
  type: 'app.credentials.authRecord';
  value: null | AuthRecord;
}
interface SelectedLangAction {
  type: 'app.lang.selected';
  value: Lang;
}
interface DefaultLangAction {
  type: 'app.lang.default';
  value: Lang;
}
type Action = AppTitleAction | AuthRecordAction | SelectedLangAction | DefaultLangAction;

class StoreService extends StoreContract {
  protected currentPath: null | string;
  protected accessToken: null | string;

  constructor(
    appInfo: AppInfoInterface,
    apiUrl: string,
    createStore: StoreCreator,
    inputValidator: InputValidatorContract,
    localMemory: LocalMemoryContract
  ) {
    super(appInfo, apiUrl, createStore, inputValidator, localMemory);
    this.currentPath = null;
    this.accessToken = null;
  }

  public async init(): Promise<void> {
    unsubscribe();

    let seed: null | Seed = null;
    let getSeedTries = 0;

    this.currentPath = (await this.localMemory.get('currentPath')) || '/';

    const getSeed = async (): Promise<void> => {
      // seed = await(await fetch(`${this.apiUrl}/seed`, { method: 'GET' })).json();
      seed = await (
        await fetch(`${this.apiUrl}/seed`, {
          method: 'GET',
          headers: {
            Authorization: this.getAccessToken() || (await memory().get('appAuthToken')) || '',
          },
        })
      ).json();
    };
    while (!seed && getSeedTries < 15) {
      try {
        await getSeed();
      } catch (err: any) {
        getSeedTries++;
        err && err.stack ? console.warn(err.name, err.message, err.stack) : console.warn(err);
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }
    if (!seed) {
      throw new Error('failed to fetch seed');
    }

    this.accessToken = seed['app.credentials.accessToken'];
    BaseForm.setup(this.inputValidator);
    this.initialState = {
      'app.meta.title': '',
      'app.credentials.authRecord': seed['app.credentials.authRecord'],
      'app.coreState.maintenance': !!seed['app.coreState.maintenance'],
      'app.lang.selected': seed['app.lang.selected'],
      'app.lang.default': seed['app.lang.default'],
      'app.lang.available': seed['app.lang.available'],
      'app.lang.translations': seed['app.lang.translations'],
    };
    this.store = this.createStore<State, Action, any, any>((state = this.initialState, action: Action) => {
      switch (action.type) {
        case 'app.meta.title':
          return {
            ...state,
            'app.meta.title': action.value,
          };
        case 'app.credentials.authRecord':
          return {
            ...state,
            'app.credentials.authRecord': action.value,
          };
        case 'app.lang.selected':
          return {
            ...state,
            'app.lang.selected': action.value,
          };
        case 'app.lang.default':
          return {
            ...state,
            'app.lang.default': action.value,
          };
        default:
          return state;
      }
    });

    unsubscribe = this.store.subscribe(() => Navigation.refresh());
  }

  public async setAuthRecord(authRecord: null | AuthRecord, accessToken: null | string): Promise<void> {
    this.store.dispatch({
      type: 'app.credentials.authRecord',
      value: authRecord,
    });
    this.accessToken = accessToken;
  }

  public async setCurrentPath(currentPath: string): Promise<void> {
    this.currentPath = currentPath;
    await this.localMemory.set('currentPath', currentPath);
  }
  public getCurrentPath(): string {
    return this.currentPath || '/';
  }

  public getAuthRecord(): null | AuthRecord {
    return this.store.getState()?.['app.credentials.authRecord'] || null;
  }

  public getAccessToken(): null | string {
    return this.accessToken;
  }

  public hasMultiLang(): boolean {
    // nothing here yet
    return false;
  }

  public setTitle(title: string): void {
    Helper.setTitle(title);
    this.store.dispatch({ type: 'app.meta.title', value: title });
  }

  public setSelectedLang(lang: Lang): void {
    this.store.dispatch({ type: 'app.lang.selected', value: lang });
  }

  public setDefaultLang(lang: Lang): void {
    this.store.dispatch({ type: 'app.lang.default', value: lang });
  }

  public getSelectedLang(): Lang {
    return this.store.getState()['app.lang.selected'];
  }

  public getDefaultLang(): Lang {
    return this.store.getState()['app.lang.default'];
  }

  public getAvailableLangs(): Lang[] {
    return this.store.getState()['app.lang.available'];
  }

  public getTranslations(): { [key: string]: { [key: string]: string } } {
    return this.store.getState()['app.lang.translations'];
  }

  public subscribe(callback: () => void): () => void {
    return this.store.subscribe(callback);
  }

  public getState(): State {
    return this.store.getState();
  }

  public getAppInfo(): AppInfoInterface {
    return this.appInfo;
  }

  public getApiUrl(): string {
    return this.apiUrl;
  }

  public driverDomainSignature(): string {
    return `*:${this.getAppInfo().bundleUid}:driver:${this.getAppInfo().signature1}`;
  }

  public mdriverDomainSignature(): string {
    // e.g.: *:com.kabayanremit.kbnremit:mdriver:krs
    return `*:${this.getAppInfo().bundleUid}:mdriver:${this.getAppInfo().signature1}`;
  }

  public sdriverDomainSignature(): string {
    return `*:${this.getAppInfo().bundleUid}:sdriver:${this.getAppInfo().signature2}`;
  }
}

export { StoreService };
