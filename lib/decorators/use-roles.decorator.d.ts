import { Role } from '../role.interface';
/**
 * Define permissions required for a controller or handler.
 * All controller and handler requirements must be satisfied.
 */
export declare const UseRoles: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
