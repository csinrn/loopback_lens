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
let IrisPoints = class IrisPoints extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
__decorate([
    repository_1.property({
        type: Number,
        required: false,
        precision: 10,
        scale: 0,
        mysql: { "columnName": "user_id", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "Y" },
    }),
    __metadata("design:type", Number)
], IrisPoints.prototype, "userId", void 0);
__decorate([
    repository_1.property({
        type: Number,
        required: false,
        precision: 10,
        scale: 0,
        mysql: { "columnName": "leftiris_x", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "Y" },
    }),
    __metadata("design:type", Number)
], IrisPoints.prototype, "leftirisX", void 0);
__decorate([
    repository_1.property({
        type: Number,
        required: false,
        precision: 10,
        scale: 0,
        mysql: { "columnName": "leftiris_y", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "Y" },
    }),
    __metadata("design:type", Number)
], IrisPoints.prototype, "leftirisY", void 0);
__decorate([
    repository_1.property({
        type: Number,
        required: false,
        precision: 10,
        scale: 0,
        mysql: { "columnName": "rightiris_x", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "Y" },
    }),
    __metadata("design:type", Number)
], IrisPoints.prototype, "rightirisX", void 0);
__decorate([
    repository_1.property({
        type: Number,
        required: false,
        precision: 10,
        scale: 0,
        mysql: { "columnName": "rightiris_y", "dataType": "int", "dataLength": null, "dataPrecision": 10, "dataScale": 0, "nullable": "Y" },
    }),
    __metadata("design:type", Number)
], IrisPoints.prototype, "rightirisY", void 0);
IrisPoints = __decorate([
    repository_1.model({
        settings: { idInjection: false, mysql: { schema: 'fmo_lensdb', table: 'iris_points' } }
    }),
    __metadata("design:paramtypes", [Object])
], IrisPoints);
exports.IrisPoints = IrisPoints;
//# sourceMappingURL=iris-points.model.js.map