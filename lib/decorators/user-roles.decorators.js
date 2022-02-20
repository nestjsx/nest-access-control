"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = void 0;
const common_1 = require("@nestjs/common");
function userFactory(ctx) {
    const contextType = ctx.getType();
    if (contextType === 'http') {
        // do something that is only important in the context of regular HTTP requests (REST)
        const { user } = ctx.switchToHttp().getRequest();
        return user;
    }
    else if (contextType === 'rpc') {
        // do something that is only important in the context of Microservice requests
        throw new Error('Rpc context is not implemented yet');
    }
    else if (contextType === 'ws') {
        // do something that is only important in the context of Websockets requests
        throw new Error('Websockets context is not implemented yet');
    }
    else if (contextType === 'graphql') {
        // inline require here, since we don't want to require the graphql module in the pacakge.
        const { GqlExecutionContext } = require('@nestjs/graphql');
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
 * In case that the request is missing User object the function will return null
 */
exports.UserRoles = (0, common_1.createParamDecorator)((propertyKey, ctx) => {
    const user = userFactory(ctx);
    if (!user)
        return null;
    return propertyKey ? user[propertyKey] : user.roles;
});
