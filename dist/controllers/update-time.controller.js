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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
"use strict";
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const validator_1 = require("../services/validator");
let UpdateTimeController = class UpdateTimeController {
    constructor(updateTimeRepository) {
        this.updateTimeRepository = updateTimeRepository;
    }
    /*  // only one instance is allowed to exist in the db
      @post('/updateTime', {
        responses: {
          '200': {
            description: 'UpdateTime model instance',
            content: { 'application/json': { schema: getModelSchemaRef(UpdateTime) } },
          },
        },
      })
      async create(
        @requestBody({
          content: {
            'application/json': {
              schema: getModelSchemaRef(UpdateTime, { exclude: ['id'] }),
            },
          },
        })
        updateTime: Omit<UpdateTime, 'id'>,
      ): Promise<UpdateTime> {
        return await this.updateTimeRepository.create(updateTime);
      }
    */
    async count(where) {
        return await this.updateTimeRepository.count(where);
    }
    async find() {
        var t = await this.updateTimeRepository.findById('0');
        return t;
    }
    async replaceById(updateTime) {
        validator_1.validate24hr(updateTime.updateFrom, '更新起始時間錯誤');
        validator_1.validate24hr(updateTime.updateTo, '更新截止時間錯誤');
        validator_1.validate24hr(updateTime.updateFreq, '更新頻率錯誤');
        if (updateTime.updateFrom >= updateTime.updateTo) {
            throw new rest_1.HttpErrors.BadRequest('起始時間需小於終止時間');
        }
        await this.updateTimeRepository.replaceById('0', updateTime);
    }
};
__decorate([
    rest_1.get('/updateTime/count', {
        responses: {
            '200': {
                description: 'UpdateTime model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.UpdateTime))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UpdateTimeController.prototype, "count", null);
__decorate([
    rest_1.get('/updateTime', {
        responses: {
            '200': {
                description: 'Array of UpdateTime model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.UpdateTime) },
                    },
                },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UpdateTimeController.prototype, "find", null);
__decorate([
    rest_1.put('/updateTime', {
        responses: {
            '204': {
                description: 'UpdateTime PUT success',
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof models_1.UpdateTime !== "undefined" && models_1.UpdateTime) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], UpdateTimeController.prototype, "replaceById", null);
UpdateTimeController = __decorate([
    __param(0, repository_1.repository(repositories_1.UpdateTimeRepository)),
    __metadata("design:paramtypes", [typeof (_b = typeof repositories_1.UpdateTimeRepository !== "undefined" && repositories_1.UpdateTimeRepository) === "function" ? _b : Object])
], UpdateTimeController);
exports.UpdateTimeController = UpdateTimeController;
//# sourceMappingURL=update-time.controller.js.map