"use strict";
/*--------------------------------------------------------------
 *  Copyright 2018 (c) Shady Khalifa (@shekohex).
 *  Licensed under the MIT License.
 *  All rights reserved.
 *-------------------------------------------------------------*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLES_BUILDER_TOKEN = void 0;
__exportStar(require("./decorators"), exports);
__exportStar(require("./access-control.module"), exports);
__exportStar(require("./roles-builder.class"), exports);
__exportStar(require("./role.interface"), exports);
__exportStar(require("./access-control.guard"), exports);
var constants_1 = require("./constants");
Object.defineProperty(exports, "ROLES_BUILDER_TOKEN", { enumerable: true, get: function () { return constants_1.ROLES_BUILDER_TOKEN; } });
