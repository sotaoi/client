"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installBundle = void 0;
const transactions_1 = require("@sotaoi/contracts/transactions");
const store_1 = require("@sotaoi/client/store");
const notification_1 = require("@sotaoi/client/notification");
const output_1 = require("@sotaoi/client/output");
const errors_1 = require("@sotaoi/contracts/errors");
const installBundle = () => {
    return new Promise((resolve, reject) => {
        try {
            const isMasterBundle = store_1.store().getAppInfo().isMasterBundle === 'yes';
            const apiUrl = store_1.store().getApiUrl();
            const formData = new FormData();
            formData.append('accessToken', '');
            formData.append('role', '');
            formData.append('repository', 'controlPanel');
            formData.append('task', isMasterBundle ? 'install-master-bundle-task' : 'install-bundle-task');
            fetch(apiUrl + '/task', { method: 'POST', body: formData })
                .then((res) => {
                res
                    .json()
                    .then((res) => {
                    resolve(notification_1.notification().conclusion(output_1.Output.parseTask(res)));
                })
                    .catch((err) => {
                    throw err;
                });
            })
                .catch((err) => {
                throw err;
            });
        }
        catch (err) {
            reject(notification_1.notification().conclusion(new transactions_1.TaskResult(400, errors_1.ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {})));
        }
    });
};
exports.installBundle = installBundle;
