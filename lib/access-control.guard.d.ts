import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesBuilder } from './roles-builder.class';
export declare class ACGuard<User extends any = any> implements CanActivate {
    private readonly reflector;
    private readonly roleBuilder;
    constructor(reflector: Reflector, roleBuilder: RolesBuilder);
    protected getUser(context: ExecutionContext): Promise<User>;
    protected getUserRoles(context: ExecutionContext): Promise<string | string[]>;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
