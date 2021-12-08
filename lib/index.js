"use strict";
/*--------------------------------------------------------------
 *  Copyright 2018 (c) Shady Khalifa (@shekohex).
 *  Licensed under the MIT License.
 *  All rights reserved.
 *-------------------------------------------------------------*/
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./decorators"));
__export(require("./access-control.module"));
__export(require("./roles-builder.class"));
__export(require("./access-control.guard"));
var constants_1 = require("./constants");
exports.ROLES_BUILDER_TOKEN = constants_1.ROLES_BUILDER_TOKEN;
