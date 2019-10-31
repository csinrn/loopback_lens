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
const rest_1 = require("@loopback/rest");
const context_1 = require("@loopback/context");
const repositories_1 = require("../repositories");
const repository_1 = require("@loopback/repository");
/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE = {
    description: 'Ping Response',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    greeting: { type: 'string' },
                    date: { type: 'string' },
                    url: { type: 'string' },
                    headers: {
                        type: 'object',
                        properties: {
                            'Content-Type': { type: 'string' },
                        },
                        additionalProperties: true,
                    },
                },
            },
        },
    },
};
/**
 * A simple controller to bounce back http requests
 */
let PingController = class PingController {
    constructor(req, updateTimeRepository) {
        this.req = req;
        this.updateTimeRepository = updateTimeRepository;
    }
    // Map to `GET /ping`
    async ping() {
        // Reply with a greeting, the current time, the url, and request headers
        var updateTime = await this.updateTimeRepository.findById('0');
        var dt = new Date();
        var hour = dt.getHours();
        var isUpdateTime = updateTime.updateFrom <= hour && updateTime.updateTo > hour;
        return {
            greeting: 'Hello from LoopBack',
            date: dt.toLocaleString(),
            date2: dt,
            hour: hour,
            url: this.req.url,
            headers: Object.assign({}, this.req.headers),
            serverIp: '192.168.1.109',
            name: 'Formosa Contact Lens Virtual Wearing System',
            version: '1.0',
            updateFrom: updateTime.updateFrom,
            updateTo: updateTime.updateTo,
            updateFreq: updateTime.updateFreq,
            isUpdateTime: isUpdateTime
        };
    }
};
__decorate([
    rest_1.get('/ping', {
        responses: {
            '200': PING_RESPONSE,
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PingController.prototype, "ping", null);
PingController = __decorate([
    __param(0, context_1.inject(rest_1.RestBindings.Http.REQUEST)),
    __param(1, repository_1.repository(repositories_1.UpdateTimeRepository)),
    __metadata("design:paramtypes", [Object, repositories_1.UpdateTimeRepository])
], PingController);
exports.PingController = PingController;
//# sourceMappingURL=ping.controller.js.map