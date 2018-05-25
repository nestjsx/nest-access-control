import { Injectable } from '@nestjs/common';
import { InjectRolesBuilder, RolesBuilder } from '../../src';
@Injectable()
export class AppService {
  constructor(
  ) {}
  root(roles: string[]) {
    return {
      userRoles: roles
    }
  }
}
