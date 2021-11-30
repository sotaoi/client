import { BaseField } from '@sotaoi/client/forms/fields/base-field';
import { SingleCollectionField, CollectionField } from '@sotaoi/client/forms/fields/collection-field';
import { Helper, TransformerFn } from '@sotaoi/client/helper';
import type { CommandResult, AuthResult, TaskResult } from '@sotaoi/contracts/transactions';

class Output {
  public static readonly ALLOW_SKIP_UNCHANGED = true;

  public static getTouchFieldsTransformer(isUpdateCommand: boolean) {
    return (item: any, prefix: string, transformer: TransformerFn, prop: string): any => {
      const key = prefix ? `${prefix}.${prop}` : prop;
      switch (true) {
        case item instanceof SingleCollectionField:
        case item instanceof CollectionField:
          // multi collection
          if (item.fields instanceof Array) {
            item.fields.map((field: any, index: string) =>
              transformer(
                field,
                `${key}.fields.${index.toString()}`,
                this.getTouchFieldsTransformer(isUpdateCommand),
                ''
              )
            );
            return item;
          }
          // single collection
          transformer(item.fields, `${key}.fields`, this.getTouchFieldsTransformer(isUpdateCommand), '');
          return item;
        // single field
        case item instanceof BaseField:
          !isUpdateCommand && item.setTouched(true);
          return item;
        default:
          Helper.iterate(item, `${key}`, this.getTouchFieldsTransformer(isUpdateCommand));
          return item;
      }
    };
  }

  public static getFieldTransformer(skipUnchanged: boolean) {
    return (item: any, prefix: string, transformer: TransformerFn, prop: string): any => {
      const key = prefix ? `${prefix}.${prop}` : prop;
      switch (true) {
        case item instanceof SingleCollectionField:
        case item instanceof CollectionField:
          // multi collection
          if (item.fields instanceof Array) {
            return item.fields.map((field: any, index: string) =>
              transformer(field, `${key}.fields.${index.toString()}`, this.getFieldTransformer(skipUnchanged), '')
            );
          }
          // single collection
          return transformer(item.fields, `${key}.fields`, this.getFieldTransformer(skipUnchanged), '');
        // single field
        case item instanceof BaseField:
          if (skipUnchanged && !item.wasChanged() && Output.ALLOW_SKIP_UNCHANGED) {
            return;
          }
          return item.value !== null ? item.value.serialize() : null;
        default:
          return Helper.iterate(item, `${key}`, this.getFieldTransformer(skipUnchanged));
      }
    };
  }

  // OMNI

  public static parseCommand(output: { [key: string]: any }): CommandResult {
    const { CommandResult } = require('@sotaoi/contracts/transactions');
    try {
      switch (true) {
        case typeof output !== 'object':
        case typeof output.code !== 'number':
        case typeof output.errorCode !== 'string' && output.errorCode !== null:
        case typeof output.title !== 'string':
        case typeof output.msg !== 'string':
        case typeof output.artifact === 'undefined':
        case typeof output.validations === 'undefined':
        case typeof output.xdata === 'undefined':
          throw new Error('bad command output');
        default:
          return new CommandResult(
            output.code,
            output.errorCode,
            output.title,
            output.msg,
            output.artifact || null,
            output.validations || null,
            output.xdata || {}
          );
      }
    } catch (err: any) {
      const { ErrorCode } = require('@sotaoi/contracts/errors');
      return new CommandResult(
        400,
        ErrorCode.APP_GENERIC_ERROR,
        err && err.name ? err.name : 'Error',
        err && err.message ? err.message : 'Something went wrong',
        null,
        null,
        {}
      );
    }
  }

  // parseQuery

  // parseRetrieve

  public static parseAuth(output: { [key: string]: any }): AuthResult {
    const { AuthResult } = require('@sotaoi/contracts/transactions');
    try {
      switch (true) {
        case typeof output !== 'object':
        case typeof output.code !== 'number':
        case typeof output.errorCode !== 'string' && output.errorCode !== null:
        case typeof output.title !== 'string':
        case typeof output.msg !== 'string':
        case typeof output.authRecord === 'undefined':
        case typeof output.accessToken === 'undefined':
        case typeof output.validations === 'undefined':
        case typeof output.xdata === 'undefined':
          throw new Error('bad auth output');
        default:
          return new AuthResult(
            output.code,
            output.errorCode,
            output.title,
            output.msg,
            output.authRecord || null,
            output.accessToken || null,
            output.validations || null,
            output.xdata || {}
          );
      }
    } catch (err: any) {
      const { ErrorCode } = require('@sotaoi/contracts/errors');
      return new AuthResult(
        400,
        ErrorCode.APP_GENERIC_ERROR,
        err && err.name ? err.name : 'Error',
        err && err.message ? err.message : 'Something went wrong',
        null,
        null,
        null,
        {}
      );
    }
  }

  public static parseTask(output: { [key: string]: any }): TaskResult {
    const { TaskResult } = require('@sotaoi/contracts/transactions');
    try {
      switch (true) {
        case typeof output !== 'object':
        case typeof output.code !== 'number':
        case typeof output.errorCode !== 'string' && output.errorCode !== null:
        case typeof output.title !== 'string':
        case typeof output.msg !== 'string':
        case typeof output.data === 'undefined':
        case typeof output.validations === 'undefined':
        case typeof output.xdata === 'undefined':
          throw new Error('bad task output');
        default:
          return new TaskResult(
            output.code,
            output.errorCode,
            output.title,
            output.msg,
            output.data || null,
            output.validations || null,
            output.xdata || {}
          );
      }
    } catch (err: any) {
      const { ErrorCode } = require('@sotaoi/contracts/errors');
      return new TaskResult(
        400,
        ErrorCode.APP_GENERIC_ERROR,
        err && err.name ? err.name : 'Error',
        err && err.message ? err.message : 'Something went wrong',
        null,
        null,
        {}
      );
    }
  }
}

export { Output };
