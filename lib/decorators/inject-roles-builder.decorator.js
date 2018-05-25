"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
/**
 *  Get access to the underlying `RolesBuilder` Object
 */
exports.InjectRolesBuilder = () => common_1.Inject(constants_1.ROLES_BUILDER_TOKEN);
