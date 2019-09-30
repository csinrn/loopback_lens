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
        type: 'string',
        precision: 10,
        scale: 0,
        id: 1,
        mysql: { "columnName": "part_no", "dataType": "varchar", "dataLength": 20, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", String)
], Lens.prototype, "partNo", void 0);
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
        mysql: { "columnName": "no", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "Y" },
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
        mysql: { "columnName": "powerL", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Lens.prototype, "powerL", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 10,
        scale: 0,
        mysql: { "columnName": "powerH", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Lens.prototype, "powerH", void 0);
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
        type: 'number',
        required: true,
        precision: 3,
        scale: 0,
        mysql: { "columnName": "daily", "dataType": "tinyint", "dataLength": null, "dataPrecision": 3, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Lens.prototype, "daily", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 3,
        scale: 0,
        mysql: { "columnName": "biweekly", "dataType": "tinyint", "dataLength": null, "dataPrecision": 3, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Lens.prototype, "biweekly", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        precision: 3,
        scale: 0,
        mysql: { "columnName": "monthly", "dataType": "tinyint", "dataLength": null, "dataPrecision": 3, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Lens.prototype, "monthly", void 0);
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
        required: true,
        precision: 10,
        scale: 0,
        mysql: { "columnName": "package", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Lens.prototype, "package", void 0);
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
        type: 'date',
        required: true,
        mysql: { "columnName": "create_at", "dataType": "date", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "N" },
    }),
    __metadata("design:type", Date)
], Lens.prototype, "createAt", void 0);
__decorate([
    repository_1.property({
        type: 'date',
        required: true,
        mysql: { "columnName": "launch_at", "dataType": "date", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "N" },
    }),
    __metadata("design:type", Date)
], Lens.prototype, "launchAt", void 0);
__decorate([
    repository_1.property({
        type: 'date',
        required: true,
        mysql: { "columnName": "remove_at", "dataType": "date", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "N" },
    }),
    __metadata("design:type", Date)
], Lens.prototype, "removeAt", void 0);
__decorate([
    repository_1.property({
        type: 'date',
        required: true,
        mysql: { "columnName": "update_at", "dataType": "date", "dataLength": null, "dataPrecision": null, "dataScale": null, "nullable": "N" },
    }),
    __metadata("design:type", Date)
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
__decorate([
    repository_1.property({
        type: 'number',
        precision: 3,
        scale: 0,
        mysql: { "columnName": "state", "dataType": "tinyint", "dataLength": null, "dataPrecision": 3, "dataScale": 0, "nullable": "N" },
    }),
    __metadata("design:type", Number)
], Lens.prototype, "state", void 0);
Lens = __decorate([
    repository_1.model({ settings: { idInjection: false, mysql: { schema: 'lensdb', table: 'lens' } } }),
    __metadata("design:paramtypes", [Object])
], Lens);
exports.Lens = Lens;
//# sourceMappingURL=lens.model.js.map