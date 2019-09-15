import { Controller, Get } from '@nestjs/common';
import { InjectRolesBuilder } from './decorators/inject-roles-builder.decorator';
import { RolesBuilder } from './roles-builder.class';

@Controller()
export class GrantsController {

  constructor(
    @InjectRolesBuilder() private readonly roleBuilder: RolesBuilder,
  ) {}

  @Get()
  public getGrants() {
    return this.roleBuilder.getGrants();
  }
}