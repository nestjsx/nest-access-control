"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectRolesBuilder = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
/**
 *  Get access to the underlying `RolesBuilder` Object
 */
const InjectRolesBuilder = () => (0, common_1.Inject)(constants_1.ROLES_BUILDER_TOKEN);
exports.InjectRolesBuilder = InjectRolesBuilder;
