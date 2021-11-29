import { Payload, RetrieveResult, QueryResult, FlistFilters, PlistFilters, SlistFilters, ActionConclusion } from '@sotaoi/contracts/transactions';
import { Artifacts } from '@sotaoi/contracts/artifacts';
import { RequestAbortHandler } from '@sotaoi/client/components';
declare class Action {
    static store(accessToken: null | string, artifacts: Artifacts, role: null | string, repository: string, payload: Payload): Promise<ActionConclusion>;
    static update(accessToken: null | string, artifacts: Artifacts, role: null | string, repository: string, uuid: string, payload: Payload): Promise<ActionConclusion>;
    static flistQuery(accessToken: null | string, role: null | string, repository: string, list: string, filters: null | FlistFilters, variant: null | string, requestAbortHandler: RequestAbortHandler): Promise<QueryResult>;
    static plistQuery(accessToken: null | string, role: null | string, repository: string, list: string, filters: null | PlistFilters, requestAbortHandler: RequestAbortHandler): Promise<QueryResult>;
    static slistQuery(accessToken: null | string, role: null | string, repository: string, list: string, filters: null | SlistFilters, requestAbortHandler: RequestAbortHandler): Promise<QueryResult>;
    static retrieve(accessToken: null | string, role: null | string, repository: string, uuid: string, variant: null | string, requestAbortHandler: RequestAbortHandler): Promise<RetrieveResult>;
    static remove(accessToken: null | string, role: null | string, repository: string, uuid: string): Promise<ActionConclusion>;
    static auth(artifacts: Artifacts, repository: string, strategy: string, payload: Payload): Promise<ActionConclusion>;
    static deauth(): Promise<void>;
    static task(accessToken: null | string, artifacts: Artifacts, role: null | string, repository: string, task: string, payload: Payload): Promise<ActionConclusion>;
}
export { Action };
