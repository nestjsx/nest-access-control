import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Access the user roles from the request object i.e `req.user.roles`.
 *
 * You can pass an optional property key to the decorator to get it from the user object
 * e.g `@UserRoles('premissions')` will return the `req.user.premissions` instead.
 */
export const UserRoles = createParamDecorator((data: string,  ctx: ExecutionContext) => {

  const request = ctx.switchToHttp().getRequest();
  return data ? request.user[data] : request.user.roles;
});
