"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
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
    else if (ctx.getType() === 'graphql') {
        // do something that is only important in the context of GraphQL requests
        const gqlExecutionContext = graphql_1.GqlExecutionContext.create(ctx);
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
exports.UserRoles = common_1.createParamDecorator((data, ctx) => {
    const user = userFactory(ctx);
    return data ? user[data] : user.roles;
});
