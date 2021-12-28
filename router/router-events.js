"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterEvents = void 0;
const helper_1 = require("@sotaoi/client/helper");
const log = console.log;
class RouterEvents {
    static listen(event, callback) {
        typeof this.listeners[event] === 'undefined' && (this.listeners[event] = {});
        const id = helper_1.Helper.uuid();
        this.listeners[event][id] = callback;
        return () => {
            delete this.listeners[event][id];
        };
    }
    static fire(event) {
        if (typeof this.listeners[event] === 'undefined') {
            log(`no listeners for event "${event}"`);
            return;
        }
        const callbacks = Object.values(this.listeners[event]);
        callbacks.map((callback) => callback());
    }
    static redirect(to) {
        if (this.redirectingTo || this.executingRedirect) {
            return;
        }
        this.redirectingTo = to;
        this.executingRedirect = false;
    }
    static setExecuteRedirect() {
        this.executingRedirect = true;
    }
    static getRedirectTo() {
        return this.redirectingTo;
    }
    static endRedirect() {
        this.redirectingTo = false;
        this.executingRedirect = false;
    }
    static isRedirecting() {
        return this.redirectingTo !== false;
    }
    static isExecutingRedirect() {
        return this.executingRedirect;
    }
    static setIsRunningConditions(flag) {
        this.isRunningConditions = flag;
    }
    static getIsRunningConditions() {
        return this.isRunningConditions;
    }
}
exports.RouterEvents = RouterEvents;
RouterEvents.listeners = {};
RouterEvents.redirectingTo = false;
RouterEvents.executingRedirect = false;
RouterEvents.isRunningConditions = false;
