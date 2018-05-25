import { DynamicModule } from '@nestjs/common';
import { RolesBuilder } from './roles-builder.class';
export declare class AccessControlModule {
    /**
     * Register a pre-defined roles
     * @param {RolesBuilder} roles  A list containing the access grant
     * definitions. See the structure of this object in the examples.
     */
    static forRoles(roles: RolesBuilder): DynamicModule;
}
