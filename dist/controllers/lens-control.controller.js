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
const validator_1 = require("../services/validator");
var fs = require('fs');
let LensControlController = class LensControlController {
    constructor(lensRepository) {
        this.lensRepository = lensRepository;
    }
    //@authenticate('jwt')
    async create(lens) {
        if (!lens) {
            throw rest_1.HttpErrors.BadRequest;
        }
        validator_1.validateDate(lens.createAt);
        if (lens.updateAt != undefined) {
            validator_1.validateDate(lens.updateAt);
        }
        validator_1.validateEnum(lens.wearingTime);
        validator_1.validateBoolean(lens.newTag, "newtag");
        validator_1.validateBoolean(lens.hotsaleTag, "hotsaletag");
        validator_1.validateBoolean(lens.onsaleTag, "onsaletag");
        //console.log(lens)
        var count = await this.lensRepository.count();
        lens.no = count.count;
        return await this.lensRepository.create(lens);
    }
    //@authenticate('jwt')
    async count(where) {
        return await this.lensRepository.count(where);
    }
    //@authenticate('jwt')
    async find(filter) {
        var list = await this.lensRepository.find(filter);
        var callback = function (err, data) {
            console.log(err);
        };
        for (var i = 0; i < list.length; i++) {
            try {
                var pic = fs.readFileSync(list[i].url, 'base64', callback);
                list[i].url = pic;
            }
            catch (_a) { }
        }
        return list;
    }
    //@authenticate('jwt')
    async updateById(id, lens) {
        await this.lensRepository.updateById(id, lens);
    }
    //@authenticate('jwt')
    async sort(id1, id2) {
        let lens1 = await this.lensRepository.findById(parseInt(id1));
        let lens2 = await this.lensRepository.findById(parseInt(id2));
        let no1 = lens1.no, no2 = lens2.no;
        //console.log("id1: ", id1, no1)
        //console.log("id2: ", id2, no2)
        let lens_t = new models_1.Lens();
        lens_t.no = -1;
        await this.lensRepository.updateById(parseInt(id1), lens_t, { partial: true });
        lens_t.no = no1;
        await this.lensRepository.updateById(parseInt(id2), lens_t, { partial: true });
        lens_t.no = no2;
        await this.lensRepository.updateById(parseInt(id1), lens_t, { partial: true });
        console.log(no1, no2, "done");
        return { responses: "exchange order " + no1 + " and " + no2 + " successfully" };
    }
    //@authenticate('jwt')
    async updateNameById(id, lens) {
        await this.lensRepository.updateById(id, lens);
    }
    //@authenticate('jwt')
    async deleteById(id) {
        await this.lensRepository.deleteById(id);
    }
    async postImg(filename, imgData) {
        var folder = 'C:/Users/jenny/Desktop/test/';
        //console.log(filename)
        if (fs.existsSync(folder + filename)) {
            throw new rest_1.HttpErrors.BadRequest('image name duplicated');
        }
        fs.writeFile(folder + filename, imgData.img.split(',')[1], 'base64', () => { });
        return { url: folder + filename };
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
    rest_1.patch('/lens/sort/{id1}/{id2}'),
    __param(0, rest_1.param.path.string('id1')),
    __param(1, rest_1.param.path.string('id2')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LensControlController.prototype, "sort", null);
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
__decorate([
    rest_1.post('/lens/img/{fileName}'),
    __param(0, rest_1.param.path.string('fileName')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.ImageStorage]),
    __metadata("design:returntype", Promise)
], LensControlController.prototype, "postImg", null);
LensControlController = __decorate([
    __param(0, repository_1.repository(repositories_1.LensRepository)),
    __metadata("design:paramtypes", [repositories_1.LensRepository])
], LensControlController);
exports.LensControlController = LensControlController;
//# sourceMappingURL=lens-control.controller.js.map