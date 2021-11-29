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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const sweetalert2_react_content_1 = __importDefault(require("sweetalert2-react-content"));
const notification_contract_1 = require("@sotaoi/contracts/http/notification-contract");
const transactions_1 = require("@sotaoi/contracts/transactions");
class NotificationService extends notification_contract_1.Notification {
    constructor(pushRoute) {
        super(pushRoute);
        this.swal = sweetalert2_react_content_1.default(sweetalert2_1.default);
    }
    fire(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.swal.fire(options);
        });
    }
    process(result) {
        if (!result.success) {
            return this.swal.fire({
                icon: 'warning',
                title: result.title,
                text: result.msg,
            });
        }
        return this.swal.fire({
            icon: 'success',
            title: result.title,
            text: result.msg,
        });
    }
    conclusion(result) {
        return new transactions_1.ActionConclusion(result, this, this.pushRoute);
    }
}
exports.NotificationService = NotificationService;