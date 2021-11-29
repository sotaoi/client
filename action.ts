import {
  Payload,
  CommandResult,
  RetrieveResult,
  QueryResult,
  AuthResult,
  TaskResult,
  FlistFilters,
  PlistFilters,
  SlistFilters,
  ActionConclusion,
} from '@sotaoi/contracts/transactions';
import { Output } from '@sotaoi/client/output';
import { Artifacts } from '@sotaoi/contracts/artifacts';
import { RequestAbortHandler } from '@sotaoi/client/components';
import { store } from '@sotaoi/client/store';
import { logger } from '@sotaoi/client/logger';
import { notification } from '@sotaoi/client/notification';
import { ErrorCode } from '@sotaoi/contracts/errors';

class Action {
  public static async store(
    accessToken: null | string,
    artifacts: Artifacts,
    role: null | string,
    repository: string,
    payload: Payload
  ): Promise<ActionConclusion> {
    try {
      const apiUrl = store().getApiUrl();
      const formData = payload.getFormData();
      formData.append('accessToken', accessToken || '');
      formData.append('role', role || '');
      formData.append('repository', repository || '');
      return notification().conclusion(
        Output.parseCommand(await (await fetch(apiUrl + '/store', { method: 'POST', body: formData })).json())
      );
    } catch (err) {
      return notification().conclusion(
        new CommandResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {})
      );
    }
  }

  public static async update(
    accessToken: null | string,
    artifacts: Artifacts,
    role: null | string,
    repository: string,
    uuid: string,
    payload: Payload
  ): Promise<ActionConclusion> {
    try {
      const apiUrl = store().getApiUrl();
      const formData = payload.getFormData();
      formData.append('accessToken', accessToken || '');
      formData.append('role', role || '');
      formData.append('repository', repository || '');
      formData.append('uuid', uuid || '');
      return notification().conclusion(
        Output.parseCommand(await (await fetch(apiUrl + '/update', { method: 'POST', body: formData })).json())
      );
    } catch (err) {
      return notification().conclusion(
        new CommandResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {})
      );
    }
  }

  public static async flistQuery(
    accessToken: null | string,
    role: null | string,
    repository: string,
    list: string,
    filters: null | FlistFilters,
    variant: null | string,
    requestAbortHandler: RequestAbortHandler
  ): Promise<QueryResult> {
    try {
      const apiUrl = store().getApiUrl();
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
      return await (
        await fetch(apiUrl + '/query', { signal: controller.signal, method: 'POST', body: formData })
      ).json();
    } catch (err) {
      return new QueryResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {});
    }
  }

  public static async plistQuery(
    accessToken: null | string,
    role: null | string,
    repository: string,
    list: string,
    filters: null | PlistFilters,
    requestAbortHandler: RequestAbortHandler
  ): Promise<QueryResult> {
    // nothing here yet
    return new QueryResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {});
  }

  public static async slistQuery(
    accessToken: null | string,
    role: null | string,
    repository: string,
    list: string,
    filters: null | SlistFilters,
    requestAbortHandler: RequestAbortHandler
  ): Promise<QueryResult> {
    // nothing here yet
    return new QueryResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {});
  }

  public static async retrieve(
    accessToken: null | string,
    role: null | string,
    repository: string,
    uuid: string,
    variant: null | string,
    requestAbortHandler: RequestAbortHandler
  ): Promise<RetrieveResult> {
    try {
      const apiUrl = store().getApiUrl();
      const formData = new FormData();
      formData.append('accessToken', accessToken || '');
      formData.append('role', role || '');
      formData.append('repository', repository);
      formData.append('uuid', uuid);
      formData.append('variant', variant || '');
      const controller = new AbortController();
      requestAbortHandler.register(() => controller.abort());
      const result = await (
        await fetch(apiUrl + '/retrieve', { signal: controller.signal, method: 'POST', body: formData })
      ).json();

      return result;
    } catch (err) {
      return new RetrieveResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {});
    }
  }

  public static async remove(
    accessToken: null | string,
    role: null | string,
    repository: string,
    uuid: string
  ): Promise<ActionConclusion> {
    try {
      const apiUrl = store().getApiUrl();
      const formData = new FormData();
      formData.append('accessToken', accessToken || '');
      formData.append('role', role || '');
      formData.append('repository', repository);
      formData.append('uuid', uuid);
      return notification().conclusion(
        Output.parseCommand(await (await fetch(apiUrl + '/remove', { method: 'POST', body: formData })).json())
      );
    } catch (err) {
      logger().estack(err);
      return notification().conclusion(
        new CommandResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {})
      );
    }
  }

  public static async auth(
    artifacts: Artifacts,
    repository: string,
    strategy: string,
    payload: Payload
  ): Promise<ActionConclusion> {
    try {
      const apiUrl = store().getApiUrl();
      const formData = payload.getFormData();
      formData.append('repository', repository);
      formData.append('strategy', strategy);
      return notification().conclusion(
        Output.parseAuth(await (await fetch(apiUrl + '/auth', { method: 'POST', body: formData })).json())
      );
    } catch (err) {
      return notification().conclusion(
        new AuthResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, null, {})
      );
    }
  }

  public static async deauth(): Promise<void> {
    const apiUrl = store().getApiUrl();
    await (await fetch(apiUrl + '/auth', { method: 'DELETE' })).json();
    await store().setAuthRecord(null, null);
  }

  public static async task(
    accessToken: null | string,
    artifacts: Artifacts,
    role: null | string,
    repository: string,
    task: string,
    payload: Payload
  ): Promise<ActionConclusion> {
    try {
      const apiUrl = store().getApiUrl();
      const formData = payload.getFormData();
      formData.append('accessToken', accessToken || '');
      formData.append('role', role || '');
      formData.append('repository', repository || '');
      formData.append('task', task || '');
      return notification().conclusion(
        Output.parseTask(await (await fetch(apiUrl + '/task', { method: 'POST', body: formData })).json())
      );
    } catch (err) {
      return notification().conclusion(
        new TaskResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {})
      );
    }
  }
}

export { Action };
