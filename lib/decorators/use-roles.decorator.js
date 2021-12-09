"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseRoles = void 0;
const common_1 = require("@nestjs/common");
/**
 * Define an access information required for this route.
 * Notice that all Roles must be satisfied/passed
 */
const UseRoles = (...roles) => (0, common_1.SetMetadata)('roles', roles);
exports.UseRoles = UseRoles;
