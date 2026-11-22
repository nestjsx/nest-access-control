import { SetMetadata } from '@nestjs/common';
import { Role } from '../role.interface';
/**
 * Define permissions required for a controller or handler.
 * All controller and handler requirements must be satisfied.
 */
export const UseRoles = (...roles: Role[]) => SetMetadata('roles', roles);
