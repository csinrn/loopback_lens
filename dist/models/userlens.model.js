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
        generated: true,
        precision: 10,
        scale: 0,
        id: 1,
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
        mysql: { "columnName": "userId", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Userlens.prototype, "userid", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        mysql: { "columnName": "lensId", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Userlens.prototype, "lensid", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        mysql: { "columnName": "lensCount", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Userlens.prototype, "lenscount", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: false,
        precision: 10,
        scale: 0,
        mysql: { "columnName": "lensTime", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "Y" },
    }),
    __metadata("design:type", Number)
], Userlens.prototype, "lenstime", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        mysql: { "columnName": "createAt", "dataType": "date", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "N" },
    }),
    __metadata("design:type", String)
], Userlens.prototype, "createat", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: false,
        mysql: { "columnName": "updateAt", "dataType": "date", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "Y" },
    }),
    __metadata("design:type", String)
], Userlens.prototype, "updateat", void 0);
Userlens = __decorate([
    repository_1.model({ settings: { idInjection: false, mysql: { schema: 'lensdb', table: 'userlens' } } }),
    __metadata("design:paramtypes", [Object])
], Userlens);
exports.Userlens = Userlens;
//# sourceMappingURL=userlens.model.js.map