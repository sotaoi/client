"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controlPanel = void 0;
const app_kernel_1 = require("@sotaoi/client/app-kernel");
const controlPanel = () => app_kernel_1.app().get('app.system.controlPanel');
exports.controlPanel = controlPanel;
