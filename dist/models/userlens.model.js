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
let Userlens = class Userlens extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
__decorate([
    repository_1.property({
        type: 'number',
        precision: 11,
        generated: true,
        required: false,
        id: 1,
        scale: 0,
        mysql: { "columnName": "id", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Userlens.prototype, "id", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        mysql: { "columnName": "user_id", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Userlens.prototype, "userId", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        mysql: { "columnName": "lens_id", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Userlens.prototype, "lensId", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        mysql: { "columnName": "lens_count", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Userlens.prototype, "lensCount", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: false,
        precision: 10,
        scale: 0,
        mysql: { "columnName": "lens_time", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "Y" },
    }),
    __metadata("design:type", Number)
], Userlens.prototype, "lensTime", void 0);
__decorate([
    repository_1.property({
        type: 'date',
        required: true,
        mysql: { "columnName": "create_at", "dataType": "date", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "N" },
    }),
    __metadata("design:type", Date)
], Userlens.prototype, "createAt", void 0);
__decorate([
    repository_1.property({
        type: 'date',
        required: false,
        mysql: { "columnName": "update_at", "dataType": "date", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "Y" },
    }),
    __metadata("design:type", Date)
], Userlens.prototype, "updateAt", void 0);
Userlens = __decorate([
    repository_1.model({ settings: { idInjection: false, mysql: { schema: 'fmo_lensdb', table: 'userlens' } } }),
    __metadata("design:paramtypes", [Object])
], Userlens);
exports.Userlens = Userlens;
//# sourceMappingURL=userlens.model.js.map