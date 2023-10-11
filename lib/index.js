"use strict";
/*--------------------------------------------------------------
 *  Copyright 2018 (c) Shady Khalifa (@shekohex).
 *  Licensed under the MIT License.
 *  All rights reserved.
 *-------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLES_BUILDER_TOKEN = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./decorators"), exports);
tslib_1.__exportStar(require("./access-control.module"), exports);
tslib_1.__exportStar(require("./roles-builder.class"), exports);
tslib_1.__exportStar(require("./role.interface"), exports);
tslib_1.__exportStar(require("./access-control.guard"), exports);
var constants_1 = require("./constants");
Object.defineProperty(exports, "ROLES_BUILDER_TOKEN", { enumerable: true, get: function () { return constants_1.ROLES_BUILDER_TOKEN; } });
