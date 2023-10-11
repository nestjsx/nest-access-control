"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrantsController = void 0;
const tslib_1 = require("tslib");
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
exports.GrantsController = GrantsController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], GrantsController.prototype, "getGrants", null);
exports.GrantsController = GrantsController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__param(0, (0, inject_roles_builder_decorator_1.InjectRolesBuilder)()),
    tslib_1.__metadata("design:paramtypes", [roles_builder_class_1.RolesBuilder])
], GrantsController);
