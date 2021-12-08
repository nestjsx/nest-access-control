import { DynamicModule, Abstract, Type, ForwardReference } from '@nestjs/common';
import { RolesBuilder } from './roles-builder.class';
import { ACOptions } from './ac-options.interface';
export declare class AccessControlModule {
    /**
     * Register a pre-defined roles
     * @param {RolesBuilder} roles  A list containing the access grant
     * definitions. See the structure of this object in the examples.
     * @param {ACOptions} options  A list of configurable options (currently just one)
     */
    static forRoles(roles: RolesBuilder, options?: ACOptions): DynamicModule;
    static forRootAsync(options: {
        imports?: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>;
        inject?: Array<Type<any> | string | symbol | Abstract<any> | Function>;
        useFactory: (...args: any) => RolesBuilder | Promise<RolesBuilder>;
        grantsEndpoint?: string;
    }): DynamicModule;
}
