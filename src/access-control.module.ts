import { Module, DynamicModule, Global, Abstract, Type } from '@nestjs/common';
import { PATH_METADATA } from '@nestjs/common/constants';
import { RolesBuilder } from './roles-builder.class';
import { ROLES_BUILDER_TOKEN } from './constants';
import { GrantsController } from './grants.controller';

@Global()
@Module({})
export class AccessControlModule {
  /**
   * Register a pre-defined roles
   * @param {RolesBuilder} roles  A list containing the access grant
   * @param {string} serveGrants A name of endpoint which serves grants
   * definitions. See the structure of this object in the examples.
   */
  public static forRoles(roles: RolesBuilder, serveGrants?: string): DynamicModule {

    Reflect.defineMetadata(PATH_METADATA, serveGrants, GrantsController);

    return {
      module: AccessControlModule,
      controllers: [
        ...serveGrants ? [GrantsController] : [],
      ],
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
