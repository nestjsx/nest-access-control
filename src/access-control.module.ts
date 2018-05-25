import { Module, DynamicModule, Global } from '@nestjs/common';
import { RolesBuilder } from './roles-builder.class';
import { ROLES_BUILDER_TOKEN } from './constants';
@Global()
@Module({})
export class AccessControlModule {
  /**
   * Register a pre-defined roles
   * @param {RolesBuilder} roles  A list containing the access grant
   * definitions. See the structure of this object in the examples.
   */
  public static forRoles(roles: RolesBuilder): DynamicModule {
    return {
      module: AccessControlModule,
      providers: [
        {
          provide: ROLES_BUILDER_TOKEN,
          useValue: roles,
        },
      ],
      exports: [
        {
          provide: ROLES_BUILDER_TOKEN,
          useValue: roles,
        },
      ],
    };
  }
}
