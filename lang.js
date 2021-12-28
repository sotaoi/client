"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lang = void 0;
const app_kernel_1 = require("@sotaoi/client/app-kernel");
const lang = () => app_kernel_1.app().get('app.system.lang');
exports.lang = lang;
