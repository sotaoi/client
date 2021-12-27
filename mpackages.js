"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackage = exports.setPackage = void 0;
const mpackages = {};
const setPackage = (name, pkg) => {
    mpackages[name] = pkg;
};
exports.setPackage = setPackage;
const getPackage = (name) => {
    return mpackages[name];
};
exports.getPackage = getPackage;
