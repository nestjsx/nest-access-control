import { Injectable } from '@nestjs/common';
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
