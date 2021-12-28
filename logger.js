"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const app_kernel_1 = require("@sotaoi/client/app-kernel");
const logger = () => app_kernel_1.app().get('app.system.logger');
exports.logger = logger;
