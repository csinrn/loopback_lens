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
function getLocalDate() {
    var dt = new Date();
    return new Date(dt.toLocaleDateString('zh-TW', {
        timeZone: 'Asia/Taipei'
    }));
}
function getLocalDateWithTime() {
    var str = new Date().toLocaleString('zh-TW', {
        timeZone: 'Asia/Taipei',
        hour12: false
    }).replace(/\//g, '-');
    var sp = str.split(',');
    var res;
    if (sp.length > 1) {
        var sp2 = sp[0].split('-');
        res = sp2[2] + '-' + sp2[0] + '-' + sp2[1] + sp[1];
    }
    else {
        res = str;
    }
    console.log(res);
    return res;
}
var nowDate = getLocalDate();
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
        // Capitalize partNo
        console.log(lens.partNo);
        lens.partNo = lens.partNo.toUpperCase();
        console.log(lens.partNo);
        // store image, throw if error
        var imgUrl = '', imgUrl2 = '';
        try {
            imgUrl = await this.postImg(lens.partNo + '.png', lens.url, '/lensPic/');
            imgUrl2 = await this.postImg(lens.partNo + '.png', lens.url2, '/lensPic_show/');
            lens.url = imgUrl;
            lens.url2 = imgUrl2;
        }
        catch (err) {
            var path = './public' + '/lensPic/' + lens.partNo + '.png';
            fs.exists(path, function (exists) {
                if (exists) {
                    fs.unlinkSync(path);
                }
            });
            throw new rest_1.HttpErrors.BadRequest(err);
        }
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
        // assign dates
        lens.updateAt = getLocalDateWithTime();
        lens.createAt = getLocalDateWithTime();
        // store lens, delete image and throw if error
        var res = await this.lensRepository.create(lens).catch((err) => {
            fs.unlinkSync('./public' + imgUrl);
            fs.unlinkSync('./public' + imgUrl2);
            throw new rest_1.HttpErrors.BadRequest(err);
        });
        return res;
    }
    //@authenticate('jwt')
    async count(where) {
        return await this.lensRepository.count(where);
    }
    async time() {
        var res = {
            newDate: nowDate,
            getLocalDate: getLocalDate(),
            getLocalDateWithTime: getLocalDateWithTime()
        };
        return res;
    }
    //@authenticate('jwt')
    async find(filter) {
        var date = getLocalDate();
        var lastUpdate = nowDate;
        if (this.compDate(lastUpdate, date) != 0) { // check the launch state everyday
            await this.renewNo();
            nowDate = getLocalDate();
        }
        var list = await this.lensRepository.find({ where: { isdeleted: 0 } });
        list.sort(this.lensComp);
        return list;
    }
    //@authenticate('jwt')
    async findbase64(filter) {
        var date = getLocalDate();
        if (this.compDate(nowDate, date) != 0) { // check the launch state everyday
            await this.renewNo();
            nowDate = getLocalDate();
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
        // renew updateAt
        lens.updateAt = getLocalDateWithTime();
        var oldLen = await this.lensRepository.findById(id);
        var isNotUpdateUrl1 = false, isNotUpdateUrl2 = false;
        if (lens.partNo != oldLen.partNo) {
            lens.partNo = lens.partNo.toUpperCase();
            if (fs.existsSync('./public/lensPic/' + lens.partNo + '.png', () => { throw new rest_1.HttpErrors.BadRequest(); })) {
                throw new rest_1.HttpErrors.BadRequest('料號重複');
            }
            // rename pics
            if (lens.url == undefined) { // if do not update new url1
                try {
                    if (!fs.existsSync('./public' + oldLen.url)) {
                        throw new rest_1.HttpErrors.BadRequest();
                    }
                    fs.rename('./public' + oldLen.url, './public/lensPic/' + lens.partNo + '.png', () => { });
                }
                catch (_a) {
                    throw new rest_1.HttpErrors.BadRequest('找不到原有圖片，請重新上傳一張新的');
                }
                lens.url = '/lensPic/' + lens.partNo + '.png';
                isNotUpdateUrl1 = true;
            }
            if (lens.url2 == undefined) { // if do not update new url2
                try {
                    if (!fs.existsSync('./public' + oldLen.url2)) {
                        throw new rest_1.HttpErrors.BadRequest();
                    }
                    fs.rename('./public' + oldLen.url2, './public/lensPic_show/' + lens.partNo + '.png', () => { });
                }
                catch (_b) {
                    throw new rest_1.HttpErrors.BadRequest('找不到原有圖片，請重新上傳一張新的');
                }
                lens.url2 = '/lensPic_show/' + lens.partNo + '.png';
                isNotUpdateUrl2 = true;
            }
        }
        if (lens.url != undefined && !isNotUpdateUrl1) { // if upload a new image && partNo is changed
            // delete the old one
            try {
                fs.unlinkSync('./public' + oldLen.url);
            }
            catch (err) {
                console.log(err);
            }
            // store the new one
            var imgUrl = '';
            try {
                imgUrl = await this.postImg(lens.partNo + '.png', lens.url, '/lensPic/');
            }
            catch (err) {
                throw new rest_1.HttpErrors.BadRequest(err);
            }
            // assign the new address to lens
            lens.url = imgUrl;
            // update pic version
            lens.picVer = oldLen.picVer + 1;
        }
        if (lens.url2 != undefined && !isNotUpdateUrl2) { // if upload a new show image && partNo is changed
            // delete the old one
            try {
                fs.unlinkSync('./public' + oldLen.url2);
            }
            catch (err) {
                console.log(err);
            }
            // store the new one
            var imgUrl2 = '';
            try {
                imgUrl2 = await this.postImg(lens.partNo + '.png', lens.url2, '/lensPic_show/');
            }
            catch (err) {
                throw new rest_1.HttpErrors.BadRequest(err);
            }
            // assign the new address to lens
            lens.url2 = imgUrl2;
            // update pic version
            lens.picVer = oldLen.picVer + 1;
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
                nextNo += 1;
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
        lens_t.updateAt = getLocalDateWithTime();
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
        lens.updateAt = getLocalDateWithTime();
        await this.lensRepository.updateById(id, lens);
    }
    //@authenticate('jwt')
    async deleteById(id) {
        var lens_t = new models_1.Lens();
        lens_t.isdeleted = 1;
        lens_t.no = undefined;
        await this.lensRepository.updateById(id, lens_t);
    }
    async postImg(filename, imgData, url) {
        var folder = './public' + url;
        // var url = '/lensPic/'
        var res = new Promise((resolve, reject) => {
            if (fs.existsSync(folder + filename)) {
                reject('料號重複');
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
        var date = getLocalDate();
        console.log('renew');
        var promiseList = [];
        list.forEach(async (lens) => {
            var launchAt = new Date(lens.launchAt), removeAt = new Date(lens.removeAt);
            // change the state, but do not change the no
            if (this.compDate(launchAt, date) == 1) { // not yet relesed
                if (lens.no != undefined || lens.state != 0) {
                    lens.no = undefined;
                    lens.state = 0;
                    lens.updateAt = getLocalDateWithTime();
                    promiseList.push(this.lensRepository.updateById(lens.id, lens));
                }
            }
            else if (this.compDate(launchAt, date) != 1 && this.compDate(removeAt, date) == 1) { // releasing
                if (lens.state != 1) { // if release at today, give it the first order
                    lens.no = nextNo;
                    nextNo += 1;
                    lens.state = 1;
                    lens.updateAt = getLocalDateWithTime();
                    promiseList.push(this.lensRepository.updateById(lens.id, lens));
                }
            }
            else { //removed
                if (lens.no != undefined || lens.state != 2) {
                    lens.no = undefined;
                    lens.state = 2;
                    lens.updateAt = getLocalDateWithTime();
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
        var list = await this.lensRepository.find({ where: { and: [{ state: 1 }, { isdeleted: 0 }] } });
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
    static compDate(a, b) {
        var ad = a.valueOf();
        var bd = b.valueOf();
        if (ad == bd) {
            return 0;
        }
        return ad > bd ? 1 : -1;
    }
    compDate(a, b) {
        var ad = a.valueOf();
        var bd = b.valueOf();
        if (ad == bd) {
            return 0;
        }
        return ad > bd ? 1 : -1;
    }
    lensComp(a, b) {
        if (a.no == undefined && b.no == undefined) { // not yet release
            if (LensControlController.compDate(new Date(a.launchAt), new Date(b.launchAt)) == 0)
                return 0;
            return LensControlController.compDate(new Date(a.launchAt), new Date(b.launchAt)) == 1 ? -1 : 1;
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
    rest_1.get('/lens/time', {
        responses: {
            '200': {
                description: 'Lens model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LensControlController.prototype, "time", null);
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
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], LensControlController.prototype, "postImg", null);
LensControlController = __decorate([
    __param(0, repository_1.repository(repositories_1.LensRepository)),
    __metadata("design:paramtypes", [repositories_1.LensRepository])
], LensControlController);
exports.LensControlController = LensControlController;
//# sourceMappingURL=lens-control.controller.js.map