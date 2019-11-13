"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const inject_roles_builder_decorator_1 = require("./decorators/inject-roles-builder.decorator");
const roles_builder_class_1 = require("./roles-builder.class");
let GrantsController = class GrantsController {
    constructor(roleBuilder) {
        this.roleBuilder = roleBuilder;
    }
    getGrants() {
        return this.roleBuilder.getGrants();
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GrantsController.prototype, "getGrants", null);
GrantsController = __decorate([
    common_1.Controller(),
    __param(0, inject_roles_builder_decorator_1.InjectRolesBuilder()),
    __metadata("design:paramtypes", [roles_builder_class_1.RolesBuilder])
], GrantsController);
exports.GrantsController = GrantsController;
