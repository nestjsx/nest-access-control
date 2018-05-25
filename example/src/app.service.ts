import { Injectable } from '@nestjs/common';
import { InjectRolesBuilder, RolesBuilder } from '../../src';
@Injectable()
export class AppService {
  private videos: string[] = ['Funny Cats', 'Ninja Dogs'];
  root(roles: string[]) {
    return {
      videos: this.videos,
      userRoles: roles
    }
  }
}
