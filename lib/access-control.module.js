"use strict";
var AccessControlModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessControlModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const constants_1 = require("@nestjs/common/constants");
const constants_2 = require("./constants");
const grants_controller_1 = require("./grants.controller");
let AccessControlModule = AccessControlModule_1 = class AccessControlModule {
    /**
     * Register a pre-defined roles
     * @param {RolesBuilder} roles  A list containing the access grant
     * definitions. See the structure of this object in the examples.
     * @param {ACOptions} options  A list of configurable options (currently just one)
     */
    static forRoles(roles, options) {
        let controllers = [];
        if (options) {
            Reflect.defineMetadata(constants_1.PATH_METADATA, options.grantsEndpoint, grants_controller_1.GrantsController);
            controllers = [...(options.grantsEndpoint ? [grants_controller_1.GrantsController] : [])];
        }
        return {
            module: AccessControlModule_1,
            controllers: [...controllers],
            providers: [
                {
                    provide: constants_2.ROLES_BUILDER_TOKEN,
                    useValue: roles,
                },
            ],
            exports: [
                {
                    provide: constants_2.ROLES_BUILDER_TOKEN,
                    useValue: roles,
                },
            ],
        };
    }
    static forRootAsync(options) {
        const provider = {
            provide: constants_2.ROLES_BUILDER_TOKEN,
            useFactory: options.useFactory,
            inject: options.inject || [],
        };
        let controllers = [];
        if (options && options.grantsEndpoint) {
            Reflect.defineMetadata(constants_1.PATH_METADATA, options.grantsEndpoint, grants_controller_1.GrantsController);
            controllers = [
                ...options.grantsEndpoint ? [grants_controller_1.GrantsController] : [],
            ];
        }
        return {
            imports: [...(options.imports || [])],
            controllers: [
                ...controllers,
            ],
            module: AccessControlModule_1,
            providers: [provider],
            exports: [provider],
        };
    }
};
exports.AccessControlModule = AccessControlModule;
exports.AccessControlModule = AccessControlModule = AccessControlModule_1 = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], AccessControlModule);
