"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = void 0;
const app_kernel_1 = require("@sotaoi/client/app-kernel");
const settings = () => app_kernel_1.app().get('app.system.settings');
exports.settings = settings;
