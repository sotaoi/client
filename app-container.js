"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppContainer = void 0;
class AppContainer {
    constructor() {
        this.services = {};
    }
    get(type) {
        return this.services[type]();
    }
    bind(type, implementation) {
        this.services[type] = typeof implementation === 'function' ? implementation : () => implementation;
    }
    singleton(type, implementation) {
        const singleton = implementation();
        this.services[type] = () => singleton;
    }
    has(item) {
        return typeof this.services[item] !== 'undefined';
    }
}
exports.AppContainer = AppContainer;
