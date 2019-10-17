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
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let IrisPointController = class IrisPointController {
    constructor(irisPointsRepository) {
        this.irisPointsRepository = irisPointsRepository;
    }
    async create(irisPoints) {
        return await this.irisPointsRepository.create(irisPoints);
    }
    async count(where) {
        return await this.irisPointsRepository.count(where);
    }
    async find(filter) {
        return await this.irisPointsRepository.find(filter);
    }
    async updateAll(irisPoints, where) {
        return await this.irisPointsRepository.updateAll(irisPoints, where);
    }
    async findById(id) {
        return await this.irisPointsRepository.findById(id);
    }
    async updateById(id, irisPoints) {
        await this.irisPointsRepository.updateById(id, irisPoints);
    }
    async replaceById(id, irisPoints) {
        await this.irisPointsRepository.replaceById(id, irisPoints);
    }
    async deleteById(id) {
        await this.irisPointsRepository.deleteById(id);
    }
};
__decorate([
    rest_1.post('/iris', {
        responses: {
            '200': {
                description: 'IrisPoints model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.IrisPoints) } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.IrisPoints, { exclude: ['id'] }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IrisPointController.prototype, "create", null);
__decorate([
    rest_1.get('/iris/count', {
        responses: {
            '200': {
                description: 'IrisPoints model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.IrisPoints))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IrisPointController.prototype, "count", null);
__decorate([
    rest_1.get('/iris', {
        responses: {
            '200': {
                description: 'Array of IrisPoints model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.IrisPoints) },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.IrisPoints))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IrisPointController.prototype, "find", null);
__decorate([
    rest_1.patch('/iris', {
        responses: {
            '200': {
                description: 'IrisPoints PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.IrisPoints, { partial: true }),
            },
        },
    })),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.IrisPoints))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.IrisPoints, Object]),
    __metadata("design:returntype", Promise)
], IrisPointController.prototype, "updateAll", null);
__decorate([
    rest_1.get('/iris/{id}', {
        responses: {
            '200': {
                description: 'IrisPoints model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.IrisPoints) } },
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IrisPointController.prototype, "findById", null);
__decorate([
    rest_1.patch('/iris/{id}', {
        responses: {
            '204': {
                description: 'IrisPoints PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.IrisPoints, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.IrisPoints]),
    __metadata("design:returntype", Promise)
], IrisPointController.prototype, "updateById", null);
__decorate([
    rest_1.put('/iris/{id}', {
        responses: {
            '204': {
                description: 'IrisPoints PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.IrisPoints]),
    __metadata("design:returntype", Promise)
], IrisPointController.prototype, "replaceById", null);
__decorate([
    rest_1.del('/iris/{id}', {
        responses: {
            '204': {
                description: 'IrisPoints DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IrisPointController.prototype, "deleteById", null);
IrisPointController = __decorate([
    __param(0, repository_1.repository(repositories_1.IrisPointsRepository)),
    __metadata("design:paramtypes", [repositories_1.IrisPointsRepository])
], IrisPointController);
exports.IrisPointController = IrisPointController;
//# sourceMappingURL=iris-point.controller.js.map