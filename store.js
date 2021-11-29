"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const app_kernel_1 = require("@sotaoi/client/app-kernel");
const store = () => app_kernel_1.app().get('app.system.store');
exports.store = store;
