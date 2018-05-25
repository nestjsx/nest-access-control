import { Role } from '../role.interface';
/**
 * Define an access information required for this route.
 * Notic that all Roles must be satisfied/Passed
 */
export declare const UseRoles: (...roles: Role[]) => (target: object, key?: any, descriptor?: any) => any;
