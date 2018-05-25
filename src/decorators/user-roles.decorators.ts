import { createParamDecorator, PipeTransform } from '@nestjs/common';

/**
 * Access the user roles from the request object i.e `req.user.roles`.
 *
 * You can pass an optinal property key to the decorator to get it from the user object
 * e.g `@UserRoles('premissions')` will return the `req.user.premissions` insted.
 */
export const UserRoles = createParamDecorator((data: string, req) => {
  return data ? req.user[data] : req.user.roles;
});
