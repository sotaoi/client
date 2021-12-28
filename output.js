"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.output = void 0;
const app_kernel_1 = require("@sotaoi/client/app-kernel");
const output = () => app_kernel_1.app().get('app.system.output');
exports.output = output;
