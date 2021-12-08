import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Role } from '..';

function userFactory<T>(ctx: ExecutionContext): T {
  const contextType = ctx.getType();
  if (contextType === 'http') {
    // do something that is only important in the context of regular HTTP requests (REST)
    const { user } = ctx.switchToHttp().getRequest();
    return user;
  } else if (contextType === 'rpc') {
    // do something that is only important in the context of Microservice requests
    throw new Error('Rpc context is not implemented yet');
  } else if (contextType === 'ws') {
    // do something that is only important in the context of Websockets requests
    throw new Error('Websockets context is not implemented yet');
  } else if (ctx.getType<GqlContextType>() === 'graphql') {
    // do something that is only important in the context of GraphQL requests
    const gqlExecutionContext = GqlExecutionContext.create(ctx);
    return gqlExecutionContext.getContext().req.user;
  }
  throw new Error('Invalid context');
}

/**
 * Access the user roles from the request object i.e `req.user.roles`.
 *
 * You can pass an optional property key to the decorator to get it from the user object
 * e.g `@UserRoles('permissions')` will return the `req.user.permissions` instead.
 */
export const UserRoles = createParamDecorator<string, ExecutionContext, (Role | string)[]>(
  (data: string, ctx: ExecutionContext) => {
    const user = userFactory<any>(ctx);
    return data ? user[data] : user.roles;
  },
);
