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
exports.Action = void 0;
const transactions_1 = require("@sotaoi/contracts/transactions");
const output_1 = require("@sotaoi/client/output");
const store_1 = require("@sotaoi/client/store");
const logger_1 = require("@sotaoi/client/logger");
const notification_1 = require("@sotaoi/client/notification");
const errors_1 = require("@sotaoi/contracts/errors");
class Action {
    static store(accessToken, artifacts, role, repository, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiUrl = store_1.store().getApiUrl();
                const formData = payload.getFormData();
                formData.append('accessToken', accessToken || '');
                formData.append('role', role || '');
                formData.append('repository', repository || '');
                return notification_1.notification().conclusion(output_1.Output.parseCommand(yield (yield fetch(apiUrl + '/store', { method: 'POST', body: formData })).json()));
            }
            catch (err) {
                return notification_1.notification().conclusion(new transactions_1.CommandResult(400, errors_1.ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {}));
            }
        });
    }
    static update(accessToken, artifacts, role, repository, uuid, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiUrl = store_1.store().getApiUrl();
                const formData = payload.getFormData();
                formData.append('accessToken', accessToken || '');
                formData.append('role', role || '');
                formData.append('repository', repository || '');
                formData.append('uuid', uuid || '');
                return notification_1.notification().conclusion(output_1.Output.parseCommand(yield (yield fetch(apiUrl + '/update', { method: 'POST', body: formData })).json()));
            }
            catch (err) {
                return notification_1.notification().conclusion(new transactions_1.CommandResult(400, errors_1.ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {}));
            }
        });
    }
    static flistQuery(accessToken, role, repository, list, filters, variant, requestAbortHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiUrl = store_1.store().getApiUrl();
                const formData = new FormData();
                formData.append('type', 'flist');
                formData.append('accessToken', accessToken || '');
                formData.append('role', role || '');
                formData.append('repository', repository);
                formData.append('list', list);
                formData.append('filters', filters ? JSON.stringify(filters) : '');
                formData.append('variant', variant || '');
                const controller = new AbortController();
                requestAbortHandler.register(() => controller.abort());
                return yield (yield fetch(apiUrl + '/query', { signal: controller.signal, method: 'POST', body: formData })).json();
            }
            catch (err) {
                return new transactions_1.QueryResult(400, errors_1.ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {});
            }
        });
    }
    static plistQuery(accessToken, role, repository, list, filters, requestAbortHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            // nothing here yet
            return new transactions_1.QueryResult(400, errors_1.ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {});
        });
    }
    static slistQuery(accessToken, role, repository, list, filters, requestAbortHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            // nothing here yet
            return new transactions_1.QueryResult(400, errors_1.ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {});
        });
    }
    static retrieve(accessToken, role, repository, uuid, variant, requestAbortHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiUrl = store_1.store().getApiUrl();
                const formData = new FormData();
                formData.append('accessToken', accessToken || '');
                formData.append('role', role || '');
                formData.append('repository', repository);
                formData.append('uuid', uuid);
                formData.append('variant', variant || '');
                const controller = new AbortController();
                requestAbortHandler.register(() => controller.abort());
                const result = yield (yield fetch(apiUrl + '/retrieve', { signal: controller.signal, method: 'POST', body: formData })).json();
                return result;
            }
            catch (err) {
                return new transactions_1.RetrieveResult(400, errors_1.ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {});
            }
        });
    }
    static remove(accessToken, role, repository, uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiUrl = store_1.store().getApiUrl();
                const formData = new FormData();
                formData.append('accessToken', accessToken || '');
                formData.append('role', role || '');
                formData.append('repository', repository);
                formData.append('uuid', uuid);
                return notification_1.notification().conclusion(output_1.Output.parseCommand(yield (yield fetch(apiUrl + '/remove', { method: 'POST', body: formData })).json()));
            }
            catch (err) {
                logger_1.logger().estack(err);
                return notification_1.notification().conclusion(new transactions_1.CommandResult(400, errors_1.ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {}));
            }
        });
    }
    static auth(artifacts, repository, strategy, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiUrl = store_1.store().getApiUrl();
                const formData = payload.getFormData();
                formData.append('repository', repository);
                formData.append('strategy', strategy);
                return notification_1.notification().conclusion(output_1.Output.parseAuth(yield (yield fetch(apiUrl + '/auth', { method: 'POST', body: formData })).json()));
            }
            catch (err) {
                return notification_1.notification().conclusion(new transactions_1.AuthResult(400, errors_1.ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, null, {}));
            }
        });
    }
    static deauth() {
        return __awaiter(this, void 0, void 0, function* () {
            const apiUrl = store_1.store().getApiUrl();
            yield (yield fetch(apiUrl + '/auth', { method: 'DELETE' })).json();
            yield store_1.store().setAuthRecord(null, null);
        });
    }
    static task(accessToken, artifacts, role, repository, task, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiUrl = store_1.store().getApiUrl();
                const formData = payload.getFormData();
                formData.append('accessToken', accessToken || '');
                formData.append('role', role || '');
                formData.append('repository', repository || '');
                formData.append('task', task || '');
                return notification_1.notification().conclusion(output_1.Output.parseTask(yield (yield fetch(apiUrl + '/task', { method: 'POST', body: formData })).json()));
            }
            catch (err) {
                return notification_1.notification().conclusion(new transactions_1.TaskResult(400, errors_1.ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {}));
            }
        });
    }
}
exports.Action = Action;
