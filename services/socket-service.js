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
exports.SocketService = void 0;
const socket_contract_1 = require("@sotaoi/contracts/http/socket-contract");
const { io } = require('socket.io/client-dist/socket.io');
class SocketService extends socket_contract_1.SocketContract {
    constructor() {
        super(...arguments);
        this._io = null;
    }
    connect(url, options) {
        this._io = io.connect(url, options);
        if (!this._io) {
            throw new Error('Socket connection failed');
        }
        this.io().on('socket:greetings', (data) => __awaiter(this, void 0, void 0, function* () {
            if (!data) {
                return;
            }
            console.info(`Server socket hailed (${typeof data}):`, data);
        }));
        return this._io;
    }
    io() {
        if (!this._io) {
            throw new Error('Socket is not yet connected');
        }
        return this._io;
    }
}
exports.SocketService = SocketService;
