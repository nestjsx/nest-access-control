"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACGuard = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const inject_roles_builder_decorator_1 = require("./decorators/inject-roles-builder.decorator");
const roles_builder_class_1 = require("./roles-builder.class");
let ACGuard = class ACGuard {
    constructor(reflector, roleBuilder) {
        this.reflector = reflector;
        this.roleBuilder = roleBuilder;
    }
    async getUser(context) {
        const contextType = context.getType().toString();
        switch (contextType) {
            case 'http':
                return context.switchToHttp().getRequest().user;
            case 'graphql':
                const { GqlExecutionContext } = require('@nestjs/graphql');
                return GqlExecutionContext.create(context).getContext().req.user;
            default:
                throw new Error(`Unsupported context type: ${contextType}`);
        }
    }
    async getUserRoles(context) {
        const user = await this.getUser(context);
        if (!user)
            throw new common_1.UnauthorizedException();
        return user['roles'];
    }
    async canActivate(context) {
        const roles = this.reflector.get('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const userRoles = await this.getUserRoles(context);
        const hasRoles = roles.every((role) => {
            const queryInfo = role;
            queryInfo.role = userRoles;
            const permission = this.roleBuilder.permission(queryInfo);
            return permission.granted;
        });
        return hasRoles;
    }
};
exports.ACGuard = ACGuard;
exports.ACGuard = ACGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(1, (0, inject_roles_builder_decorator_1.InjectRolesBuilder)()),
    tslib_1.__metadata("design:paramtypes", [core_1.Reflector,
        roles_builder_class_1.RolesBuilder])
], ACGuard);
