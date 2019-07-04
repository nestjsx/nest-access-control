import { Module, DynamicModule, Global, Abstract, Type } from '@nestjs/common';
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

  public static forRootAsync(options: {
    inject?: Array<Type<any> | string | symbol | Abstract<any> | Function>,
    useFactory: (...args: any) => RolesBuilder | Promise<RolesBuilder>,
  }): DynamicModule {

    const provider = {
      provide: ROLES_BUILDER_TOKEN,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    return {
      module: AccessControlModule,
      providers: [
        provider,
      ],
      exports: [
        provider,
      ],
    };
  }
}
