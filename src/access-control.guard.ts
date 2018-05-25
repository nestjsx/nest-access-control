import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.interface';
import { InjectRolesBuilder } from './decorators/inject-roles-builder.decorator';
import { RolesBuilder } from './roles-builder.class';

@Injectable()
export class ACGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRolesBuilder() private readonly roleBuilder: RolesBuilder,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) throw new UnauthorizedException();
    const hasRoles = roles.every(role => {
      (role as any).role = user.roles;
      const permission = this.roleBuilder.permission(role);
      return permission.granted;
    });
    return hasRoles;
  }
}
