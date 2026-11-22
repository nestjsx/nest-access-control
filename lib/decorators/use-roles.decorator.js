"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseRoles = void 0;
const common_1 = require("@nestjs/common");
/**
 * Define permissions required for a controller or handler.
 * All controller and handler requirements must be satisfied.
 */
const UseRoles = (...roles) => (0, common_1.SetMetadata)('roles', roles);
exports.UseRoles = UseRoles;
