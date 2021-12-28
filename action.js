"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = void 0;
const app_kernel_1 = require("@sotaoi/client/app-kernel");
const action = () => app_kernel_1.app().get('app.system.action');
exports.action = action;
