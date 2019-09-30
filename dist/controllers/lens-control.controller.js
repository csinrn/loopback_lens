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
var nowDate = new Date(); //new Date().getDate()
var nextNo = 0;
let LensControlController = class LensControlController {
    constructor(lensRepository) {
        this.lensRepository = lensRepository;
        var array = this.lensRepository.find();
        array.then((array) => {
            nextNo = 0;
            array.forEach((len) => {
                if (len.state == 1)
                    nextNo++;
            });
            //console.log('nextNo:', nextNo)
        }).catch((err) => {
            console.log(err);
            throw new Error('nextNo initiallize error');
        });
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
        var list = await this.lensRepository.find(filter);
        var date = new Date();
        if (this.compDate(nowDate, date) != 0) {
            //await this.renewNo(list)
            nowDate = new Date();
        }
        list = await this.lensRepository.find(filter);
        return list;
    }
    //@authenticate('jwt')
    async updateById(id, lens) {
        lens.updateAt = new Date();
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
        lens_t.updateAt = new Date();
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
        lens.updateAt = new Date();
        await this.lensRepository.updateById(id, lens);
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
        if (lens.state == 1)
            nextNo -= 1;
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
    async renewNo(list) {
        var dt = new Date();
        var date = parseInt(this.getDateString(dt));
        var releasingList = [];
        var promiseList = [];
        list.forEach(async (lens) => {
            var launchAt = parseInt(this.getDateString(lens.launchAt)), removeAt = parseInt(this.getDateString(lens.removeAt));
            if (launchAt > date) { // not yet relesed
                if (lens.no != undefined || lens.state != 0) {
                    lens.no = undefined;
                    lens.state = 0;
                    lens.updateAt = new Date();
                    promiseList.push(this.lensRepository.updateById(lens.partNo, lens));
                }
            }
            else if (launchAt <= date && removeAt > date) { // releasing
                lens.state = 1;
                lens.updateAt = new Date();
                releasingList.push(lens);
            }
            else { //removed
                if (lens.no != undefined || lens.state != 2) {
                    lens.no = undefined;
                    lens.state = 2;
                    lens.updateAt = new Date();
                    promiseList.push(this.lensRepository.updateById(lens.partNo, lens));
                }
            }
        });
        // rearrange no, start from 0 and with no empty
        releasingList.sort(this.lensComp);
        //console.log(releasingList)
        var i = 0;
        releasingList.forEach((lens) => {
            if (lens.no != i) {
                lens.no = i;
                promiseList.push(this.lensRepository.updateById(lens.partNo, lens));
            }
            i++;
        });
        // fire all update
        await Promise.all(promiseList);
        nextNo = i;
        console.log(nextNo);
    }
    async arrangeNo() {
        var array = await this.lensRepository.find();
        var list = [];
        array.forEach((len) => {
            if (len.state == 1)
                list.push(len);
        });
        //console.log(' ')
        list.sort(this.lensComp);
        var index = 0;
        for (var i = list.length - 1; i >= 0; i--) {
            var len_t = new models_1.Lens();
            len_t.no = list.length - i - 1;
            //console.log(list[i].no, list.length - i - 1)
            this.lensRepository.updateById(list[i].id, len_t);
        }
    }
    lensComp(a, b) {
        if (a.no == undefined && b.no == undefined) {
            if (parseInt(this.getDateString(a.launchAt)) == parseInt(this.getDateString(a.launchAt)))
                return 0;
            return parseInt(this.getDateString(a.launchAt)) > parseInt(this.getDateString(b.launchAt)) ? -1 : 1;
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
    getDateString(dt) {
        var year = dt.getFullYear().toString(), month = (dt.getMonth() + 1).toString(), day = dt.getDate().toString();
        year = year[2] + year[3];
        month = (month.length == 1) ? '0' + month : month;
        day = (day.length == 1) ? '0' + day : day;
        return (year + month + day).toString();
    }
    initNextNo() {
        var array = this.lensRepository.find();
        array.then((array) => {
            nextNo = 0;
            array.forEach((len) => {
                if (len.state == 1)
                    nextNo++;
            });
            //console.log('nextNo:', nextNo)
        }).catch((err) => {
            console.log(err);
            throw new Error('nextNo initiallize error');
        });
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