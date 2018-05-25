import { Get, Controller, UseGuards } from '@nestjs/common';
import { UserRoles, UseRoles, ACGuard } from 'nest-access-control';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';
import { AppRoles } from 'app.roles';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @UseGuards(AuthGuard, ACGuard)
  @UseRoles({
    resource: 'video',
    action: 'read',
    possession: 'any',
  })
  @Get()
  root(@UserRoles() userRoles: any) {
    return this.appService.root(userRoles);
  }
}
