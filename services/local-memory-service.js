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
exports.LocalMemoryService = void 0;
// import type { AsyncStorageStatic } from '@react-native-community/async-storage';
const local_memory_contract_1 = require("@sotaoi/contracts/http/local-memory-contract");
const helper_1 = require("@sotaoi/client/helper");
class LocalMemoryService extends local_memory_contract_1.LocalMemoryContract {
    // constructor(allowedKeys: string[], asyncStorage: null | AsyncStorageStatic) {
    constructor(allowedKeys, asyncStorage) {
        super();
        this.allowedKeys = allowedKeys;
        this.asyncStorage = asyncStorage;
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkKey(key);
            yield this._set(key, value);
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkKey(key);
            return this._get(key);
        });
    }
    remove(key) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkKey(key);
            yield this._remove(key);
        });
    }
    _set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const stringified = JSON.stringify({ v: value });
            switch (true) {
                case helper_1.Helper.isWeb():
                    window.localStorage.setItem(key, stringified);
                    break;
                case helper_1.Helper.isMobile():
                    this.asyncStorage && (yield this.asyncStorage.setItem(key, stringified));
                    break;
                case helper_1.Helper.isElectron():
                    console.warn('no electron yet');
                    break;
                default:
                    throw new Error('Unknown environment');
            }
        });
    }
    _get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let value = null;
            switch (true) {
                case helper_1.Helper.isWeb():
                    value = window.localStorage.getItem(key) || null;
                    break;
                case helper_1.Helper.isMobile():
                    value = (this.asyncStorage && (yield this.asyncStorage.getItem(key))) || null;
                    break;
                case helper_1.Helper.isElectron():
                    throw new Error('No electron yet');
                default:
                    throw new Error('Unknown environment');
            }
            if (typeof value !== 'string') {
                return value;
            }
            try {
                return JSON.parse(value).v || null;
            }
            catch (err) {
                console.error(err);
                return null;
            }
        });
    }
    _remove(key) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (true) {
                case helper_1.Helper.isWeb():
                    window.localStorage.removeItem(key);
                    break;
                case helper_1.Helper.isMobile():
                    this.asyncStorage && (yield this.asyncStorage.removeItem(key));
                    break;
                case helper_1.Helper.isElectron():
                    throw new Error('No electron yet');
                default:
                    throw new Error('Unknown environment');
            }
        });
    }
    checkKey(key) {
        if (this.allowedKeys.indexOf(key) === -1) {
            throw new Error(`storage key '${key}' not allowed`);
        }
    }
}
exports.LocalMemoryService = LocalMemoryService;
