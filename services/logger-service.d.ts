import { LoggerContract } from '@sotaoi/contracts/http/logger-contract';
declare class LoggerService extends LoggerContract {
    notice(...textArr: any[]): void;
    info(...textArr: any[]): void;
    warn(...textArr: any[]): void;
    error(...textArr: any[]): void;
    estack(err: any): void;
    wstack(err: any): void;
}
export { LoggerService };
