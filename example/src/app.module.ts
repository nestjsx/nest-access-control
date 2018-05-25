import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';
@Module({
  imports: [AccessControlModule.forRoles(roles)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
