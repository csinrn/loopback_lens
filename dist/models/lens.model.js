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
        mysql: { "columnName": "name", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "N" },
    }),
    __metadata("design:type", String)
], Lens.prototype, "name", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        generated: true,
        precision: 10,
        scale: 0,
        mysql: { "columnName": "no", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Lens.prototype, "no", void 0);
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
        mysql: { "columnName": "wearing_time", "dataType": "enum", "dataLength": 8, "dataPrecision": null, "dataScale": null, "nullable": "N" },
    }),
    __metadata("design:type", String)
], Lens.prototype, "wearingTime", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 50,
        mysql: { "columnName": "place_of_prod", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "N" },
    }),
    __metadata("design:type", String)
], Lens.prototype, "placeOfProd", void 0);
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
        required: false,
        precision: 10,
        scale: 0,
        mysql: { "columnName": "special_price", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Lens.prototype, "specialPrice", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: false,
        length: 50,
        mysql: { "columnName": "event_disp", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "Y" },
    }),
    __metadata("design:type", String)
], Lens.prototype, "eventDisp", void 0);
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
        mysql: { "columnName": "new_tag", "dataType": "tinyint", "dataLength": null, "dataPrecision": 3, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Lens.prototype, "newTag", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 3,
        scale: 0,
        mysql: { "columnName": "hotsale_tag", "dataType": "tinyint", "dataLength": null, "dataPrecision": 3, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Lens.prototype, "hotsaleTag", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 3,
        scale: 0,
        mysql: { "columnName": "onsale_tag", "dataType": "tinyint", "dataLength": null, "dataPrecision": 3, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Lens.prototype, "onsaleTag", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        mysql: { "columnName": "create_at", "dataType": "date", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "N" },
    }),
    __metadata("design:type", String)
], Lens.prototype, "createAt", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: false,
        mysql: { "columnName": "update_at", "dataType": "date", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "Y" },
    }),
    __metadata("design:type", String)
], Lens.prototype, "updateAt", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        length: 50,
        mysql: { "columnName": "url", "dataType": "varchar", "dataLength": 50, "dataPrecision": null, "dataScale": null, "nullable": "N" },
    }),
    __metadata("design:type", String)
], Lens.prototype, "url", void 0);
Lens = __decorate([
    repository_1.model({ settings: { idInjection: false, mysql: { schema: 'lensdb', table: 'lens' } } }),
    __metadata("design:paramtypes", [Object])
], Lens);
exports.Lens = Lens;
//# sourceMappingURL=lens.model.js.map