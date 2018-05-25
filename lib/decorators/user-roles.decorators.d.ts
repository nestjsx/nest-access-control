import { PipeTransform } from '@nestjs/common';
/**
 * Access the user roles from the request object i.e `req.user.roles`.
 *
 * You can pass an optional property key to the decorator to get it from the user object
 * e.g `@UserRoles('premissions')` will return the `req.user.premissions` instead.
 */
export declare const UserRoles: (data?: any, ...pipes: PipeTransform<any, any>[]) => ParameterDecorator;
