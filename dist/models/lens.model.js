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
let Lens = class Lens extends repository_1.Entity {
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
], Lens.prototype, "id", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 50,
        mysql: { "columnName": "lensPic", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "N" },
    }),
    __metadata("design:type", String)
], Lens.prototype, "lenspic", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 50,
        mysql: { "columnName": "name", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "N" },
    }),
    __metadata("design:type", String)
], Lens.prototype, "name", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 12,
        mysql: { "columnName": "diameter", "dataType": "float", "dataLength": null, "dataPrecision": 12, "dataScale": null, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Lens.prototype, "diameter", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 12,
        mysql: { "columnName": "BC", "dataType": "float", "dataLength": null, "dataPrecision": 12, "dataScale": null, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Lens.prototype, "bc", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        mysql: { "columnName": "power", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Lens.prototype, "power", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        mysql: { "columnName": "water", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Lens.prototype, "water", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 8,
        mysql: { "columnName": "wearingTime", "dataType": "enum", "dataLength": 8, "dataPrecision": null, "dataScale": null, "nullable": "N" },
    }),
    __metadata("design:type", String)
], Lens.prototype, "wearingtime", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 50,
        mysql: { "columnName": "placeOfProd", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "N" },
    }),
    __metadata("design:type", String)
], Lens.prototype, "placeofprod", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        mysql: { "columnName": "price", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Lens.prototype, "price", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        mysql: { "columnName": "specialPrice", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Lens.prototype, "specialprice", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: false,
        length: 50,
        mysql: { "columnName": "eventDisp", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "Y" },
    }),
    __metadata("design:type", String)
], Lens.prototype, "eventdisp", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 50,
        mysql: { "columnName": "license", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "N" },
    }),
    __metadata("design:type", String)
], Lens.prototype, "license", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 3,
        scale: 0,
        mysql: { "columnName": "newTag", "dataType": "tinyint", "dataLength": null, "dataPrecision": 3, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Lens.prototype, "newtag", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 3,
        scale: 0,
        mysql: { "columnName": "hotsaleTag", "dataType": "tinyint", "dataLength": null, "dataPrecision": 3, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Lens.prototype, "hotsaletag", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 3,
        scale: 0,
        mysql: { "columnName": "onsaleTag", "dataType": "tinyint", "dataLength": null, "dataPrecision": 3, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Lens.prototype, "onsaletag", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        mysql: { "columnName": "launchAt", "dataType": "date", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "N" },
    }),
    __metadata("design:type", String)
], Lens.prototype, "launchat", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: false,
        mysql: { "columnName": "closeAt", "dataType": "date", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "Y" },
    }),
    __metadata("design:type", String)
], Lens.prototype, "closeat", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: false,
        length: 50,
        mysql: { "columnName": "url", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "Y" },
    }),
    __metadata("design:type", String)
], Lens.prototype, "url", void 0);
Lens = __decorate([
    repository_1.model({ settings: { idInjection: false, mysql: { schema: 'lensdb', table: 'lens' } } }),
    __metadata("design:paramtypes", [Object])
], Lens);
exports.Lens = Lens;
//# sourceMappingURL=lens.model.js.map