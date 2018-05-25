import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesBuilder } from './roles-builder.class';
export declare class ACGuard implements CanActivate {
    private readonly reflector;
    private readonly roleBuilder;
    constructor(reflector: Reflector, roleBuilder: RolesBuilder);
    canActivate(context: ExecutionContext): boolean;
}
