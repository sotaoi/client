import { TransformerFn } from '@sotaoi/client/helper';
import type { CommandResult, AuthResult, TaskResult } from '@sotaoi/contracts/transactions';
declare class Output {
    static readonly ALLOW_SKIP_UNCHANGED = true;
    static getTouchFieldsTransformer(isUpdateCommand: boolean): (item: any, prefix: string, transformer: TransformerFn, prop: string) => any;
    static getFieldTransformer(skipUnchanged: boolean): (item: any, prefix: string, transformer: TransformerFn, prop: string) => any;
    static parseCommand(output: {
        [key: string]: any;
    }): CommandResult;
    static parseAuth(output: {
        [key: string]: any;
    }): AuthResult;
    static parseTask(output: {
        [key: string]: any;
    }): TaskResult;
}
export { Output };
