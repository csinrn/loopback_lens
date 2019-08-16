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
const authentication_1 = require("@loopback/authentication");
const validator_1 = require("../services/validator");
let LensControlController = class LensControlController {
    constructor(lensRepository) {
        this.lensRepository = lensRepository;
    }
    async create(lens) {
        if (!lens) {
            throw rest_1.HttpErrors.BadRequest;
        }
        validator_1.validateDate(lens.launchat);
        if (lens.updateat != undefined) {
            validator_1.validateDate(lens.closeat);
        }
        validator_1.validateEnum(lens.wearingtime);
        validator_1.validateBoolean(lens.newtag, "newtag");
        validator_1.validateBoolean(lens.hotsaletag, "hotsaletag");
        validator_1.validateBoolean(lens.onsaletag, "onsaletag");
        return await this.lensRepository.create(lens);
    }
    async count(where) {
        return await this.lensRepository.count(where);
    }
    async find(filter) {
        return await this.lensRepository.find(filter);
    }
    async findById(id) {
        return await this.lensRepository.findById(id);
    }
    async updateById(id, lens) {
        await this.lensRepository.updateById(id, lens);
    }
    async updateNameById(id, lens) {
        await this.lensRepository.updateById(id, lens);
    }
    async replaceById(id, lens) {
        await this.lensRepository.replaceById(id, lens);
    }
    async deleteById(id) {
        await this.lensRepository.deleteById(id);
    }
};
__decorate([
    rest_1.post('/lens', {
        responses: {
            '200': {
                description: 'Lens model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Lens) } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Lens, { exclude: ['id'] }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LensControlController.prototype, "create", null);
__decorate([
    rest_1.get('/lens/count', {
        responses: {
            '200': {
                description: 'Lens model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Lens))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LensControlController.prototype, "count", null);
__decorate([
    rest_1.get('/lens', {
        responses: {
            '200': {
                description: 'Array of Lens model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.Lens) },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Lens))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LensControlController.prototype, "find", null);
__decorate([
    rest_1.get('/lens/{id}', {
        responses: {
            '200': {
                description: 'Lens model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Lens) } },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LensControlController.prototype, "findById", null);
__decorate([
    rest_1.patch('/lens/{id}', {
        responses: {
            '204': {
                description: 'Lens PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Lens, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.Lens]),
    __metadata("design:returntype", Promise)
], LensControlController.prototype, "updateById", null);
__decorate([
    rest_1.patch('/lens/{id}/name', {
        responses: {
            '204': {
                description: 'Lens PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Lens, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.Lens]),
    __metadata("design:returntype", Promise)
], LensControlController.prototype, "updateNameById", null);
__decorate([
    rest_1.put('/lens/{id}', {
        responses: {
            '204': {
                description: 'Lens PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.Lens]),
    __metadata("design:returntype", Promise)
], LensControlController.prototype, "replaceById", null);
__decorate([
    rest_1.del('/lens/{id}', {
        responses: {
            '204': {
                description: 'Lens DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LensControlController.prototype, "deleteById", null);
LensControlController = __decorate([
    __param(0, repository_1.repository(repositories_1.LensRepository)),
    __metadata("design:paramtypes", [repositories_1.LensRepository])
], LensControlController);
exports.LensControlController = LensControlController;
//# sourceMappingURL=lens-control.controller.js.map