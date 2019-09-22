import { SetMetadata } from '@nestjs/common';
import { Role } from '../role.interface';
/**
 * Define an access information required for this route.
 * Notice that all Roles must be satisfied/passed
 */
export const UseRoles = (...roles: Role[]) => SetMetadata('roles', roles);
