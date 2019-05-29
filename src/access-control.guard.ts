import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IQueryInfo, Permission } from 'accesscontrol';

import { InjectRolesBuilder } from './decorators/inject-roles-builder.decorator';
import { Role } from './role.interface';
import { RolesBuilder } from './roles-builder.class';

@Injectable()
export class ACGuard<User extends any = any> implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRolesBuilder() private readonly roleBuilder: RolesBuilder,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const userRoles = await this.getUserRoles(context);
    const hasRoles = roles.every(role => {
      const queryInfo: IQueryInfo = role;
      queryInfo.role = userRoles;
      const permission = this.roleBuilder.permission(queryInfo);
      this.setContextPermission(context, permission);
      return permission.granted;
    });

    return hasRoles;
  }

  protected async getUser(context: ExecutionContext): Promise<User> {
    const request = context.switchToHttp().getRequest();
    return request.user;
  }

  protected async getUserRoles(context: ExecutionContext): Promise<string | string[]> {
    const user = await this.getUser(context);
    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }
    return user.roles;
  }

  protected async setContextPermission(context: ExecutionContext, permission: Permission) {
    const request = context.switchToHttp().getRequest();
    request.permissions = [...(request.permissions || []), permission];
  }
}
