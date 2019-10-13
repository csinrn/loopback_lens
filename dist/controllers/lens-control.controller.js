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
var nowDate = new Date();
var nextNo = 0;
let LensControlController = class LensControlController {
    constructor(lensRepository) {
        this.lensRepository = lensRepository;
    }
    //@authenticate('jwt')
    async create(lens) {
        if (!lens) {
            throw rest_1.HttpErrors.BadRequest;
        }
        validator_1.validateBoolean(lens.newTag, "newtag");
        validator_1.validateBoolean(lens.hotsaleTag, "hotsaletag");
        validator_1.validateBoolean(lens.onsaleTag, "onsaletag");
        validator_1.validateBoolean(lens.daily, "dailytag");
        validator_1.validateBoolean(lens.biweekly, "biweeklytag");
        validator_1.validateBoolean(lens.monthly, "monthlytag");
        // store image, throw if error
        var imgUrl = '';
        try {
            imgUrl = await this.postImg(lens.partNo + '.png', lens.url);
            lens.url = imgUrl;
        }
        catch (err) {
            throw new rest_1.HttpErrors.BadRequest(err);
        }
        // Capitalize partNo
        lens.partNo = lens.partNo.toUpperCase();
        // assign state and no fields
        if (this.compDate(new Date(lens.launchAt), nowDate) == 1) { // not yet released
            lens.no = undefined;
            lens.state = 0;
        }
        else if (this.compDate(new Date(lens.launchAt), nowDate) == -1 && this.compDate(new Date(lens.removeAt), nowDate) == 1) { // released
            lens.no = nextNo;
            nextNo += 1;
            //console.log('nextNo:', nextNo)
            lens.state = 1;
        }
        else { //removed
            lens.no = undefined;
            lens.state = 2;
        }
        // store lens, delete image and throw if error
        var res = await this.lensRepository.create(lens).catch((err) => {
            fs.unlinkSync('./public' + imgUrl);
            throw new rest_1.HttpErrors.BadRequest(err);
        });
        return res;
    }
    //@authenticate('jwt')
    async count(where) {
        return await this.lensRepository.count(where);
    }
    //@authenticate('jwt')
    async find(filter) {
        var date = new Date();
        if (this.compDate(nowDate, date) != 0) { // check the launch state everyday
            await this.renewNo();
            nowDate = new Date();
        }
        return await this.lensRepository.find(filter);
    }
    //@authenticate('jwt')
    async findbase64(filter) {
        var date = new Date();
        if (this.compDate(nowDate, date) != 0) { // check the launch state everyday
            await this.renewNo();
            nowDate = new Date();
        }
        var list = await this.lensRepository.find(filter);
        var callback = function (err, data) {
            console.log(err);
        };
        for (var i = 0; i < list.length; i++) {
            try {
                var pic = fs.readFileSync('./public' + list[i].url, 'base64', callback);
                list[i].url = pic;
            }
            catch (err) {
                throw new rest_1.HttpErrors.Conflict(err);
            }
        }
        return list;
    }
    //@authenticate('jwt')
    async updateById(id, lens) {
        var dt = new Date();
        lens.updateAt = new Date(dt.getTime() - dt.getTimezoneOffset() * 60 * 1000);
        var oldLen = await this.lensRepository.findById(id);
        if (lens.url != undefined) { // if upload a new image
            // delete the old one
            try {
                fs.unlinkSync('./public' + oldLen.url);
            }
            catch (err) {
                console.log(err);
            }
            // store the new one
            var imgUrl = '';
            imgUrl = await this.postImg(lens.partNo + '.png', lens.url);
            // assign the new address to lens
            lens.url = imgUrl;
            //console.log(lens)
        }
        else if (lens.partNo != oldLen.partNo) { // if not update pic but update the partNo,
            // change old pic name to new partNo
            if (fs.existsSync('./public/lensPic/' + lens.partNo + '.png', () => { throw new rest_1.HttpErrors.BadRequest(); })) {
                throw new rest_1.HttpErrors.BadRequest('料號重復');
            }
            try {
                fs.rename('./public' + oldLen.url, './public/lensPic/' + lens.partNo + '.png', () => { });
            }
            catch (_a) {
                throw new rest_1.HttpErrors.BadRequest('找不到原有圖片，請重新上傳一張新的');
            }
            lens.url = '/lensPic/' + lens.partNo + '.png';
        }
        // check the state
        var no, state = oldLen.state;
        if (this.compDate(new Date(lens.launchAt), new Date(oldLen.launchAt)) != 0 || this.compDate(new Date(lens.removeAt), new Date(oldLen.removeAt)) != 0) {
            if (this.compDate(new Date(lens.launchAt), nowDate) == 1) { // not yet released
                no = undefined;
                state = 0;
            }
            else if (this.compDate(new Date(lens.launchAt), nowDate) == -1 && this.compDate(new Date(lens.removeAt), nowDate) == 1) { // released
                no = nextNo;
                //console.log('nextNo:', nextNo)
                state = 1;
            }
            else { //removed
                no = undefined;
                state = 2;
            }
        }
        if (state != oldLen.state) {
            lens.state = state;
            lens.no = no;
        }
        await this.lensRepository.updateById(id, lens);
        this.arrangeNo();
    }
    //@authenticate('jwt')
    async sort(id1, id2) {
        let lens1 = await this.lensRepository.findById(id1);
        let lens2 = await this.lensRepository.findById(id2);
        let no1 = lens1.no, no2 = lens2.no;
        let lens_t = new models_1.Lens();
        lens_t.no = -1;
        var dt = new Date();
        lens_t.updateAt = new Date(dt.getTime() - dt.getTimezoneOffset() * 60 * 1000);
        await this.lensRepository.updateById(id1, lens_t, { partial: true });
        lens_t.no = no1;
        await this.lensRepository.updateById(id2, lens_t, { partial: true });
        lens_t.no = no2;
        await this.lensRepository.updateById(id1, lens_t, { partial: true });
        //console.log(no1, no2, "done")
        return { responses: "exchange order " + no1 + " and " + no2 + " successfully" };
    }
    //@authenticate('jwt')
    async updateNameById(id, lens) {
        var dt = new Date();
        lens.updateAt = new Date(dt.getTime() - dt.getTimezoneOffset() * 60 * 1000);
        await this.lensRepository.updateById(id, lens);
    }
    async test() {
        return await this.lensRepository.find({ where: { state: 0 } });
    }
    //@authenticate('jwt')
    async deleteById(id) {
        var lens = await this.lensRepository.findById(id);
        //console.log('./public' + lens.url)
        try {
            fs.unlinkSync('./public' + lens.url);
        }
        catch (err) {
            console.log('Can not delete picture ' + './public' + lens.url + ', picture does not exist');
        }
        //console.log('delete img f')
        var lens = await this.lensRepository.findById(id);
        if (lens.state == 1) {
            this.arrangeNo();
            this.initNextNo();
        }
        await this.lensRepository.deleteById(id);
        //console.log('nextNo:', nextNo)
    }
    async postImg(filename, imgData) {
        var folder = './public/lensPic/';
        var url = '/lensPic/';
        var res = new Promise((resolve, reject) => {
            if (fs.existsSync(folder + filename)) {
                reject('image name duplicated');
            }
            try {
                fs.writeFileSync(folder + filename, imgData.split(',')[1], 'base64', () => { });
            }
            catch (err) {
                reject(err);
            }
            //console.log('postImg: ', url + filename)
            resolve((url + filename));
        });
        return res;
    }
    async renewNo() {
        var list = await this.lensRepository.find();
        var date = new Date();
        console.log('renew');
        var promiseList = [];
        list.forEach(async (lens) => {
            var launchAt = new Date(lens.launchAt), removeAt = new Date(lens.removeAt);
            // change the state, but do not change the no
            if (this.compDate(launchAt, date) == 1) { // not yet relesed
                if (lens.no != undefined || lens.state != 0) {
                    lens.no = undefined;
                    lens.state = 0;
                    var dt = new Date();
                    lens.updateAt = new Date(dt.getTime() - dt.getTimezoneOffset() * 60 * 1000);
                    promiseList.push(this.lensRepository.updateById(lens.id, lens));
                }
            }
            else if (this.compDate(launchAt, date) != 1 && this.compDate(removeAt, date) == 1) { // releasing
                if (lens.state != 1) { // if release at today, give it the first order
                    lens.no = nextNo;
                    nextNo += 1;
                    lens.state = 1;
                    var dt = new Date();
                    lens.updateAt = new Date(dt.getTime() - dt.getTimezoneOffset() * 60 * 1000);
                    promiseList.push(this.lensRepository.updateById(lens.id, lens));
                }
            }
            else { //removed
                if (lens.no != undefined || lens.state != 2) {
                    lens.no = undefined;
                    lens.state = 2;
                    var dt = new Date();
                    lens.updateAt = new Date(dt.getTime() - dt.getTimezoneOffset() * 60 * 1000);
                    promiseList.push(this.lensRepository.updateById(lens.id, lens));
                }
            }
        });
        await Promise.all(promiseList);
        // rearrange no, start from 0 and with no empty
        this.initNextNo();
        await this.arrangeNo();
    }
    async arrangeNo() {
        // put state==1 lens into list
        var list = await this.lensRepository.find({ where: { state: 1 } });
        list.sort(this.lensComp);
        for (var i = list.length - 1; i >= 0; i--) {
            var len_t = new models_1.Lens();
            len_t.no = list.length - i - 1;
            this.lensRepository.updateById(list[i].id, len_t);
        }
    }
    async initNextNo() {
        var array = await this.lensRepository.find({ where: { state: 1 } });
        nextNo = array.length;
        console.log('nextNo:', nextNo);
    }
    compDate(a, b) {
        var ad = Date.parse(a.toDateString()).valueOf();
        var bd = Date.parse(b.toDateString()).valueOf();
        //console.log('comp:', a, b, ad, bd)
        if (ad == bd) {
            return 0;
        }
        return ad > bd ? 1 : -1;
    }
    lensComp(a, b) {
        if (a.no == undefined && b.no == undefined) { // not yet release
            if (this.compDate(new Date(a.launchAt), new Date(b.launchAt)) == 0)
                return 0;
            return this.compDate(new Date(a.launchAt), new Date(b.launchAt)) == 1 ? -1 : 1;
        }
        else if (a.no == undefined || b.no == undefined) {
            if (a.no == undefined)
                return 1;
            else
                return 0;
        }
        else {
            if (a.no == b.no)
                return 0;
            return a.no > b.no ? -1 : 1;
        }
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
                schema: rest_1.getModelSchemaRef(models_1.Lens),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Lens]),
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
    rest_1.get('/lens/base64', {
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
], LensControlController.prototype, "findbase64", null);
__decorate([
    rest_1.patch('/lens/{id}'),
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
    rest_1.get('/lens/test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LensControlController.prototype, "test", null);
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LensControlController.prototype, "postImg", null);
LensControlController = __decorate([
    __param(0, repository_1.repository(repositories_1.LensRepository)),
    __metadata("design:paramtypes", [repositories_1.LensRepository])
], LensControlController);
exports.LensControlController = LensControlController;
//# sourceMappingURL=lens-control.controller.js.map