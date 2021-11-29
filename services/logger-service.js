"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const chalk_1 = __importDefault(require("chalk"));
const logger_contract_1 = require("@sotaoi/contracts/http/logger-contract");
const log = console.log;
const warn = console.warn;
const error = console.error;
class LoggerService extends logger_contract_1.Logger {
    notice(...textArr) {
        let header = new Date().toISOString().substr(0, 19).replace('T', ' ');
        header = `[${header}] NOTICE:`;
        textArr.map((text) => {
            log(header, text, '\n');
        });
    }
    info(...textArr) {
        let header = new Date().toISOString().substr(0, 19).replace('T', ' ');
        header = `[${header}] INFO:`;
        textArr.map((text) => {
            log(header, text, '\n');
        });
    }
    warn(...textArr) {
        let header = new Date().toISOString().substr(0, 19).replace('T', ' ');
        header = `[${header}] WARNING:`;
        textArr.map((text) => {
            warn(chalk_1.default.yellow(header, text), '\n');
        });
    }
    error(...textArr) {
        let header = new Date().toISOString().substr(0, 19).replace('T', ' ');
        header = `[${header}] ERROR:`;
        textArr.map((text) => {
            error(chalk_1.default.red(header, text), '\n');
        });
    }
    estack(err) {
        let header = new Date().toISOString().substr(0, 19).replace('T', ' ');
        header = `[${header}] ERROR:`;
        error(chalk_1.default.red(header, err), '\n');
    }
    wstack(err) {
        let header = new Date().toISOString().substr(0, 19).replace('T', ' ');
        header = `[${header}] WARNING:`;
        error(chalk_1.default.yellow(header, err), '\n');
    }
}
exports.LoggerService = LoggerService;
