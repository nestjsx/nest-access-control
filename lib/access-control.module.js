"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AccessControlModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessControlModule = void 0;
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
AccessControlModule = AccessControlModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], AccessControlModule);
exports.AccessControlModule = AccessControlModule;
