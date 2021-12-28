"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetService = void 0;
const storage_driver_1 = require("@sotaoi/storage-driver");
class AssetService extends storage_driver_1.StorageDriver {
    constructor(storageUrl, clientId, clientKey, preferSecure) {
        super(storageUrl, '', clientId, clientKey, '', preferSecure);
    }
}
exports.AssetService = AssetService;
