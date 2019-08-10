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
let UserLensControlController = class UserLensControlController {
    constructor(userlensRepository) {
        this.userlensRepository = userlensRepository;
    }
    async create(userlens) {
        console.log(userlens);
        return await this.userlensRepository.create(userlens);
    }
    async count(where) {
        return await this.userlensRepository.count(where);
    }
    async find(filter) {
        return await this.userlensRepository.find(filter);
    }
    async updateAll(userlens, where) {
        return await this.userlensRepository.updateAll(userlens, where);
    }
    async findById(user_id) {
        return await this.userlensRepository.find({ where: { userid: user_id } });
    }
    async updateById(id, userlens) {
        await this.userlensRepository.updateById(id, userlens);
    }
    /////
    async updateTime(userid, lensid, userlens) {
        let dat = await this.userlensRepository.findOne({
            where: {
                and: [
                    { lensid: lensid },
                    { userid: userid }
                ]
            }
        });
        if (!dat)
            throw new rest_1.HttpErrors.NotFound('userID not found');
        if (dat.id == undefined)
            throw new rest_1.HttpErrors.NotFound('id property not found');
        console.log(dat);
        await this.userlensRepository.updateById(dat.id.toString(), userlens);
    }
    async updateCount(userid, lensid, userlens) {
        //console.log(userlens)
        let user = await this.userlensRepository.findOne({ where: { and: [{ userid: userid }, { lensid: lensid }] } });
        if (!user)
            throw new rest_1.HttpErrors.NotFound('user not found');
        if (user.id == undefined)
            throw new rest_1.HttpErrors.NotFound('id undefined');
        if (user.lenscount == undefined)
            throw new rest_1.HttpErrors.NotFound('lensCount undefined');
        user.lenscount = user.lenscount + 1;
        await this.userlensRepository.updateById(user.id.toString(), user);
    }
    /////
    async replaceById(id, userlens) {
        await this.userlensRepository.replaceById(id, userlens);
    }
    async deleteById(id) {
        await this.userlensRepository.deleteById(id);
    }
};
__decorate([
    rest_1.post('/user', {
        responses: {
            '200': {
                description: 'Userlens model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Userlens) } },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Userlens]),
    __metadata("design:returntype", Promise)
], UserLensControlController.prototype, "create", null);
__decorate([
    rest_1.get('/user/count', {
        responses: {
            '200': {
                description: 'Userlens model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Userlens))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserLensControlController.prototype, "count", null);
__decorate([
    rest_1.get('/user', {
        responses: {
            '200': {
                description: 'Array of Userlens model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.Userlens) },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Userlens))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserLensControlController.prototype, "find", null);
__decorate([
    rest_1.patch('/user', {
        responses: {
            '200': {
                description: 'Userlens PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Userlens, { partial: true }),
            },
        },
    })),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Userlens))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Userlens, Object]),
    __metadata("design:returntype", Promise)
], UserLensControlController.prototype, "updateAll", null);
__decorate([
    rest_1.get('/user/{user_id}', {
        responses: {
            '200': {
                description: 'Userlens model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Userlens) } },
            },
        },
    }),
    __param(0, rest_1.param.path.string('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserLensControlController.prototype, "findById", null);
__decorate([
    rest_1.patch('/user/{id}', {
        responses: {
            '204': {
                description: 'Userlens PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Userlens, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.Userlens]),
    __metadata("design:returntype", Promise)
], UserLensControlController.prototype, "updateById", null);
__decorate([
    rest_1.patch('/user/{user_id}/{lens_id}/time', {
        responses: {
            '204': {
                description: 'Userlens PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('user_id')),
    __param(1, rest_1.param.path.string('lens_id')),
    __param(2, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Userlens, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, models_1.Userlens]),
    __metadata("design:returntype", Promise)
], UserLensControlController.prototype, "updateTime", null);
__decorate([
    rest_1.patch('/user/{user_id}/{lens_id}/count', {
        responses: {
            '204': {
                description: 'Userlens PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('user_id')),
    __param(1, rest_1.param.path.string('lens_id')),
    __param(2, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Userlens, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, models_1.Userlens]),
    __metadata("design:returntype", Promise)
], UserLensControlController.prototype, "updateCount", null);
__decorate([
    rest_1.put('/user/{id}', {
        responses: {
            '204': {
                description: 'Userlens PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.Userlens]),
    __metadata("design:returntype", Promise)
], UserLensControlController.prototype, "replaceById", null);
__decorate([
    rest_1.del('/user/{id}', {
        responses: {
            '204': {
                description: 'Userlens DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserLensControlController.prototype, "deleteById", null);
UserLensControlController = __decorate([
    __param(0, repository_1.repository(repositories_1.UserlensRepository)),
    __metadata("design:paramtypes", [repositories_1.UserlensRepository])
], UserLensControlController);
exports.UserLensControlController = UserLensControlController;
//# sourceMappingURL=user-lens-control.controller.js.map