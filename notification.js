"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notification = void 0;
const app_kernel_1 = require("@sotaoi/client/app-kernel");
const notification = () => app_kernel_1.app().get('app.system.notification');
exports.notification = notification;
