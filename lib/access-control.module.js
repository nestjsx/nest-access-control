"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var AccessControlModule_1;
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
let AccessControlModule = AccessControlModule_1 = class AccessControlModule {
    /**
     * Register a pre-defined roles
     * @param {RolesBuilder} roles  A list containing the access grant
     * definitions. See the structure of this object in the examples.
     */
    static forRoles(roles) {
        return {
            module: AccessControlModule_1,
            providers: [
                {
                    provide: constants_1.ROLES_BUILDER_TOKEN,
                    useValue: roles,
                },
            ],
            exports: [
                {
                    provide: constants_1.ROLES_BUILDER_TOKEN,
                    useValue: roles,
                },
            ],
        };
    }
    static forRootAsync(options) {
        const provider = {
            provide: constants_1.ROLES_BUILDER_TOKEN,
            useFactory: options.useFactory,
            inject: options.inject || [],
        };
        return {
            module: AccessControlModule_1,
            providers: [
                provider,
            ],
            exports: [
                provider,
            ],
        };
    }
};
AccessControlModule = AccessControlModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], AccessControlModule);
exports.AccessControlModule = AccessControlModule;
