import { Role } from '../role.interface';
/**
 * Define an access information required for this route.
 * Notice that all Roles must be satisfied/passed
 */
export declare const UseRoles: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
