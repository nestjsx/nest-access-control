import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IQueryInfo } from 'accesscontrol';
import { Role } from './role.interface';
import { InjectRolesBuilder } from './decorators/inject-roles-builder.decorator';
import { RolesBuilder } from './roles-builder.class';

@Injectable()
export class ACGuard<User extends any = any> implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRolesBuilder() private readonly roleBuilder: RolesBuilder,
  ) {}

  protected async getUser(context: ExecutionContext): Promise<User> {
    const request = context.switchToHttp().getRequest();
    return request.user;
  }

  protected async getUserRoles(context: ExecutionContext): Promise<string | string[]> {
    const user = await this.getUser(context);
    if (!user) throw new UnauthorizedException();
    return user.roles;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const userRoles = await this.getUserRoles(context);
    const hasRoles = roles.every(role => {
      const queryInfo: IQueryInfo = role;
      queryInfo.role = userRoles;
      const permission = this.roleBuilder.permission(queryInfo);
      return permission.granted;
    });
    return hasRoles;
  }
}
