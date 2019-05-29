import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Permission } from 'accesscontrol';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Interceptor that automatically filter attributes defined in access control.
 */
@Injectable()
export class AccessControlInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { permissions } = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map((data: any) => {
        if (!permissions) {
          return data;
        }

        return permissions.reduce((acc: any, permission: Permission) => {
          return permission.filter(acc);
        }, data);
      })
    );
  }
}
