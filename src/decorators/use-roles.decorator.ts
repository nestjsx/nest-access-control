import { ReflectMetadata } from '@nestjs/common';
import { Role } from '../role.interface';
/**
 * Define an access information required for this route.
 * Notic that all Roles must be satisfied/Passed
 */
export const UseRoles = (...roles: Role[]) => ReflectMetadata('roles', roles);
