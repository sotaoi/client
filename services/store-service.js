"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreService = void 0;
const store_contract_1 = require("@sotaoi/contracts/http/store-contract");
const base_form_1 = require("@sotaoi/client/forms/form-classes/base-form");
const navigation_1 = require("@sotaoi/client/router/navigation");
const helper_1 = require("@sotaoi/client/helper");
let unsubscribe = () => undefined;
class StoreService extends store_contract_1.StoreContract {
    constructor(appInfo, apiUrl, createStore, inputValidator, localMemory) {
        super(appInfo, apiUrl, createStore, inputValidator, localMemory);
        this.currentPath = null;
        this.accessToken = null;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            unsubscribe();
            let seed = null;
            let getSeedTries = 0;
            this.currentPath = (yield this.localMemory.get('currentPath')) || '/';
            const getSeed = () => __awaiter(this, void 0, void 0, function* () {
                seed = yield (yield fetch(`${this.apiUrl}/seed`, { method: 'GET' })).json();
            });
            while (!seed && getSeedTries < 15) {
                try {
                    yield getSeed();
                }
                catch (err) {
                    getSeedTries++;
                    err && err.stack ? console.warn(err.name, err.message, err.stack) : console.warn(err);
                    yield new Promise((resolve) => setTimeout(resolve, 3000));
                }
            }
            if (!seed) {
                throw new Error('failed to fetch seed');
            }
            this.accessToken = seed['app.credentials.accessToken'];
            base_form_1.BaseForm.setup(this.inputValidator);
            this.initialState = {
                'app.meta.title': '',
                'app.credentials.authRecord': seed['app.credentials.authRecord'],
                'app.coreState.maintenance': !!seed['app.coreState.maintenance'],
                'app.lang.selected': seed['app.lang.selected'],
                'app.lang.default': seed['app.lang.default'],
                'app.lang.available': seed['app.lang.available'],
                'app.lang.translations': seed['app.lang.translations'],
            };
            this.store = this.createStore((state = this.initialState, action) => {
                switch (action.type) {
                    case 'app.meta.title':
                        return Object.assign(Object.assign({}, state), { 'app.meta.title': action.value });
                    case 'app.credentials.authRecord':
                        return Object.assign(Object.assign({}, state), { 'app.credentials.authRecord': action.value });
                    case 'app.lang.selected':
                        return Object.assign(Object.assign({}, state), { 'app.lang.selected': action.value });
                    case 'app.lang.default':
                        return Object.assign(Object.assign({}, state), { 'app.lang.default': action.value });
                    default:
                        return state;
                }
            });
            unsubscribe = this.store.subscribe(() => navigation_1.Navigation.refresh());
        });
    }
    setAuthRecord(authRecord, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            this.store.dispatch({
                type: 'app.credentials.authRecord',
                value: authRecord,
            });
            this.accessToken = accessToken;
        });
    }
    setCurrentPath(currentPath) {
        return __awaiter(this, void 0, void 0, function* () {
            this.currentPath = currentPath;
            yield this.localMemory.set('currentPath', currentPath);
        });
    }
    getCurrentPath() {
        return this.currentPath || '/';
    }
    getAuthRecord() {
        var _a;
        return ((_a = this.store.getState()) === null || _a === void 0 ? void 0 : _a['app.credentials.authRecord']) || null;
    }
    getAccessToken() {
        return this.accessToken;
    }
    hasMultiLang() {
        // nothing here yet
        return false;
    }
    setTitle(title) {
        helper_1.Helper.setTitle(title);
        this.store.dispatch({ type: 'app.meta.title', value: title });
    }
    setSelectedLang(lang) {
        this.store.dispatch({ type: 'app.lang.selected', value: lang });
    }
    setDefaultLang(lang) {
        this.store.dispatch({ type: 'app.lang.default', value: lang });
    }
    getSelectedLang() {
        return this.store.getState()['app.lang.selected'];
    }
    getDefaultLang() {
        return this.store.getState()['app.lang.default'];
    }
    getAvailableLangs() {
        return this.store.getState()['app.lang.available'];
    }
    getTranslations() {
        return this.store.getState()['app.lang.translations'];
    }
    subscribe(callback) {
        return this.store.subscribe(callback);
    }
    getState() {
        return this.store.getState();
    }
    getAppInfo() {
        return this.appInfo;
    }
    getApiUrl() {
        return this.apiUrl;
    }
    driverDomainSignature() {
        return `*:${this.getAppInfo().bundleUid}:driver:${this.getAppInfo().signature1}`;
    }
    mdriverDomainSignature() {
        return `*:${this.getAppInfo().bundleUid}:mdriver:${this.getAppInfo().signature1}`;
    }
    sdriverDomainSignature() {
        return `*:${this.getAppInfo().bundleUid}:sdriver:${this.getAppInfo().signature2}`;
    }
}
exports.StoreService = StoreService;
