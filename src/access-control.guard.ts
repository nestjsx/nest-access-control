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

  async getUser(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    return request.user;
  }

  async getUserRoles(context: ExecutionContext): Promise<any> {
    const user = await this.getUser(context);
    if (!user) throw new UnauthorizedException();
    return user.roles
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    
    const userRoles = await this.getUserRoles(context);
    const hasRoles = roles.every(role => {
      (role as any).role = userRoles;
      const permission = this.roleBuilder.permission(role);
      return permission.granted;
    });
    return hasRoles;
  }
}
