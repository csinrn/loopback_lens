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
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
let Admin = class Admin extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
__decorate([
    repository_1.property({
        type: 'number',
        precision: 10,
        generated: true,
        required: false,
        id: 1,
        scale: 0,
        mysql: { "columnName": "id", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Admin.prototype, "id", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 50,
        mysql: { "columnName": "account", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "N" },
    }),
    __metadata("design:type", String)
], Admin.prototype, "account", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 100,
        mysql: { "columnName": "password", "dataType": "varchar", "dataLength": 100, "dataPrecision": null, "dataScale": null, "nullable": "N" },
    }),
    __metadata("design:type", String)
], Admin.prototype, "password", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        mysql: { "columnName": "create_at", "dataType": "datetime", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "N" },
    }),
    __metadata("design:type", String)
], Admin.prototype, "createAt", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 50,
        mysql: { "columnName": "name", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "N" },
    }),
    __metadata("design:type", String)
], Admin.prototype, "name", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        length: 50,
        mysql: { "columnName": "is_Admin", "dataType": "tinyint", "dataLength": null, "dataPrecision": 3, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Admin.prototype, "isAdmin", void 0);
Admin = __decorate([
    repository_1.model({ settings: { idInjection: false, mysql: { schema: 'fmo_lensdb', table: 'admin' } } }),
    __metadata("design:paramtypes", [Object])
], Admin);
exports.Admin = Admin;
//# sourceMappingURL=admin.model.js.map