"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
/**
 * Define an access information required for this route.
 * Notice that all Roles must be satisfied/passed
 */
exports.UseRoles = (...roles) => common_1.SetMetadata('roles', roles);
