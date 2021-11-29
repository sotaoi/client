"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = void 0;
const app_kernel_1 = require("@sotaoi/client/app-kernel");
const socket = () => app_kernel_1.app().get('app.system.socket');
exports.socket = socket;
