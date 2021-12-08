import { ActionConclusion, TaskResult } from '@sotaoi/contracts/transactions';
import { store } from '@sotaoi/client/store';
import { notification } from '@sotaoi/client/notification';
import { output } from '@sotaoi/client/output';
import { ErrorCode } from '@sotaoi/contracts/errors';

const installBundle = (): Promise<ActionConclusion> => {
  return new Promise((resolve, reject) => {
    try {
      const isMasterBundle = store().getAppInfo().isMasterBundle === 'yes';
      const apiUrl = store().getApiUrl();
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
              resolve(notification().conclusion(output().parseTask(res)));
            })
            .catch((err) => {
              throw err;
            });
        })
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      reject(
        notification().conclusion(
          new TaskResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {})
        )
      );
    }
  });
};

export { installBundle };
