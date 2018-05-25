import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const fakeUser = {
      roles: ['ADMIN_UPDATE_OWN_VIDEO', 'USER_CREATE_ANY_VIDEO'],
      username: '@fake',
    };
    req.user = fakeUser;
    return true;
  }
}
