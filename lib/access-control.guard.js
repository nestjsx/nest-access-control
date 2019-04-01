"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
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
        const request = context.switchToHttp().getRequest();
        return request.user;
    }
    async getUserRoles(context) {
        const user = await this.getUser(context);
        if (!user)
            throw new common_1.UnauthorizedException();
        return user.roles;
    }
    async canActivate(context) {
        const roles = this.reflector.get('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const userRoles = await this.getUserRoles(context);
        const hasRoles = roles.every(role => {
            const queryInfo = role;
            queryInfo.role = userRoles;
            const permission = this.roleBuilder.permission(queryInfo);
            return permission.granted;
        });
        return hasRoles;
    }
};
ACGuard = __decorate([
    common_1.Injectable(),
    __param(1, inject_roles_builder_decorator_1.InjectRolesBuilder()),
    __metadata("design:paramtypes", [core_1.Reflector,
        roles_builder_class_1.RolesBuilder])
], ACGuard);
exports.ACGuard = ACGuard;
