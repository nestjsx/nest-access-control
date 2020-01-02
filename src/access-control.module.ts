import { Module, DynamicModule, Global, Abstract, Type, ForwardReference } from '@nestjs/common';
import { PATH_METADATA } from '@nestjs/common/constants';
import { RolesBuilder } from './roles-builder.class';
import { ROLES_BUILDER_TOKEN } from './constants';
import { GrantsController } from './grants.controller';
import { ACOptions } from './ac-options.interface';

@Global()
@Module({})
export class AccessControlModule {
  /**
   * Register a pre-defined roles
   * @param {RolesBuilder} roles  A list containing the access grant
   * @param {ACOptions} options  A configurable options
   * definitions. See the structure of this object in the examples.
   */
  public static forRoles(roles: RolesBuilder, options?: ACOptions): DynamicModule {

    let controllers = [];

    if (options) {
      Reflect.defineMetadata(PATH_METADATA, options.grantsEndpoint, GrantsController);
      controllers = [
        ...options.grantsEndpoint ? [GrantsController] : [],
      ];
    }

    return {
      module: AccessControlModule,
      controllers: [
        ...controllers,
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
    imports?: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>;
    inject?: Array<Type<any> | string | symbol | Abstract<any> | Function>;
    useFactory: (...args: any) => RolesBuilder | Promise<RolesBuilder>;
    grantsEndpoint?: string;
  }): DynamicModule {

    const provider = {
      provide: ROLES_BUILDER_TOKEN,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    let controllers = [];

    if (options && options.grantsEndpoint) {
      Reflect.defineMetadata(PATH_METADATA, options.grantsEndpoint, GrantsController);
      controllers = [
        ...options.grantsEndpoint ? [GrantsController] : [],
      ];
    }

    return {
      imports: [...(options.imports || [])],
      controllers: [
        ...controllers,
      ],
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
