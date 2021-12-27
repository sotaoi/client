"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainLayout = void 0;
const react_1 = __importDefault(require("react"));
const MainLayout = (props) => (react_1.default.createElement("div", { style: { margin: 10 } },
    react_1.default.createElement("h2", null, "Control Panel"),
    react_1.default.createElement("hr", null),
    props.children));
exports.MainLayout = MainLayout;
