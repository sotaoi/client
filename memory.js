"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memory = void 0;
const app_kernel_1 = require("@sotaoi/client/app-kernel");
const memory = () => app_kernel_1.app().get('app.system.localMemory');
exports.memory = memory;
