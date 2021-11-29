"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstallLayout = void 0;
const react_1 = __importDefault(require("react"));
const router_1 = require("@sotaoi/client/router");
const InstallLayout = (props) => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("nav", { className: 'flex pl-4 flex-row w-full items-center text-white bg-black shadow' },
            react_1.default.createElement(router_1.Link, { to: '/' },
                react_1.default.createElement("button", { className: 'm-2 p-2 text-white rounded text-2xl' }, "Install")),
            react_1.default.createElement(router_1.Link, { to: '/link-1' },
                react_1.default.createElement("button", { className: 'm-2 p-2 text-white rounded bg-blue-700' }, "Nav Example 1")),
            react_1.default.createElement(router_1.Link, { to: '/link-2' },
                react_1.default.createElement("button", { className: 'm-2 p-2 text-white rounded' }, "Nav Example 2"))),
        react_1.default.createElement("div", null, props.children)));
};
exports.InstallLayout = InstallLayout;
