import { Logger } from '@sotaoi/contracts/http/logger-contract';
declare class LoggerService extends Logger {
    notice(...textArr: any[]): void;
    info(...textArr: any[]): void;
    warn(...textArr: any[]): void;
    error(...textArr: any[]): void;
    estack(err: any): void;
    wstack(err: any): void;
}
export { LoggerService };
