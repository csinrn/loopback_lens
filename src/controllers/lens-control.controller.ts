import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
  HttpErrors,
} from '@loopback/rest';
import { Lens, ImageStorage } from '../models';
import { LensRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { validateDate, validateBoolean } from '../services/validator';
import { DEFAULT_ENCODING } from 'crypto';
import { resolve } from 'url';
var fs = require('fs')

function getLocalDate(): Date {
  var dt = new Date()
  return new Date(dt.toLocaleDateString('zh-TW', {
    timeZone: 'Asia/Taipei'
  }))
}

function getLocalDateWithTime(): string {
  var str = new Date().toLocaleString('zh-TW', {
    timeZone: 'Asia/Taipei',
    hour12: false
  }).replace(/\//g, '-')
  var sp = str.split(',')
  var res
  if (sp.length > 1) {
    var sp2 = sp[0].split('-')
    res = sp2[2] + '-' + sp2[0] + '-' + sp2[1] + sp[1]
  } else {
    res = str
  }
  console.log(res)
  return res
}

var nowDate = getLocalDate()
var nextNo = 0;

export class LensControlController {
  constructor(
    @repository(LensRepository)
    public lensRepository: LensRepository,
  ) { }

  //@authenticate('jwt')
  @post('/lens', {
    responses: {
      '200': {
        description: 'Lens model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Lens) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lens),
        },
      },
    })
    lens: Lens,
  ): Promise<Lens> {
    if (!lens) {
      throw HttpErrors.BadRequest;
    }
    validateBoolean(lens.newTag, "newtag")
    validateBoolean(lens.hotsaleTag, "hotsaletag")
    validateBoolean(lens.onsaleTag, "onsaletag")
    validateBoolean(lens.daily, "dailytag")
    validateBoolean(lens.biweekly, "biweeklytag")
    validateBoolean(lens.monthly, "monthlytag")

    // Capitalize partNo
    console.log(lens.partNo)
    lens.partNo = lens.partNo.toUpperCase()
    console.log(lens.partNo)

    // store image, throw if error
    var imgUrl = '', imgUrl2 = ''
    try {
      imgUrl = await this.postImg(lens.partNo + '.png', lens.url, '/lensPic/')
      imgUrl2 = await this.postImg(lens.partNo + '.png', lens.url2, '/lensPic_show/')
      lens.url = imgUrl
      lens.url2 = imgUrl2
    } catch (err) {
      var path = './public' + '/lensPic/' + lens.partNo + '.png'
      fs.exists(path, function (exists: boolean) {
        if (exists) {
          fs.unlinkSync(path)
        }
      });
      throw new HttpErrors.BadRequest(err)
    }

    // assign state and no fields
    if (this.compDate(new Date(lens.launchAt), nowDate) == 1) {  // not yet released
      lens.no = undefined;
      lens.state = 0;
    } else if (this.compDate(new Date(lens.launchAt), nowDate) == -1 && this.compDate(new Date(lens.removeAt), nowDate) == 1) { // released
      lens.no = nextNo;
      nextNo += 1;
      //console.log('nextNo:', nextNo)
      lens.state = 1;
    } else { //removed
      lens.no = undefined
      lens.state = 2
    }

    // assign dates
    lens.updateAt = getLocalDateWithTime()
    lens.createAt = getLocalDateWithTime()

    // store lens, delete image and throw if error
    var res = await this.lensRepository.create(lens).catch((err) => {
      fs.unlinkSync('./public' + imgUrl)
      fs.unlinkSync('./public' + imgUrl2)
      throw new HttpErrors.BadRequest(err)
    })

    return res
  }

  //@authenticate('jwt')
  @get('/lens/count', {
    responses: {
      '200': {
        description: 'Lens model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Lens)) where?: Where<Lens>,
  ): Promise<Count> {
    return await this.lensRepository.count(where);
  }

  @get('/lens/time', {
    responses: {
      '200': {
        description: 'Lens model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async time() {
    var res = {
      newDate: nowDate,
      getLocalDate: getLocalDate(),
      getLocalDateWithTime: getLocalDateWithTime()
    }
    return res
  }

  //@authenticate('jwt')
  @get('/lens', {
    responses: {
      '200': {
        description: 'Array of Lens model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Lens) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Lens)) filter?: Filter<Lens>,
  ) {

    var date = getLocalDate()
    var lastUpdate = nowDate
    if (this.compDate(lastUpdate, date) != 0) {  // check the launch state everyday
      await this.renewNo()
      nowDate = getLocalDate()
    }

    var list = await this.lensRepository.find({ where: { isdeleted: 0 } });
    list.sort(this.lensComp)
    return list
  }

  //@authenticate('jwt')
  @get('/lens/base64', {
    responses: {
      '200': {
        description: 'Array of Lens model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Lens) },
          },
        },
      },
    },
  })
  async findbase64(
    @param.query.object('filter', getFilterSchemaFor(Lens)) filter?: Filter<Lens>,
  ): Promise<Lens[]> {

    var date = getLocalDate()
    if (this.compDate(nowDate, date) != 0) {  // check the launch state everyday
      await this.renewNo()
      nowDate = getLocalDate()
    }

    var list = await this.lensRepository.find(filter)
    var callback = function (err: any, data: any) {
      console.log(err)
    }
    for (var i = 0; i < list.length; i++) {
      try {
        var pic = fs.readFileSync('./public' + list[i].url, 'base64', callback)
        list[i].url = pic
      } catch (err) {
        throw new HttpErrors.Conflict(err)
      }
    }
    return list;
  }


  //@authenticate('jwt')
  @patch('/lens/{id}')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lens, { partial: true }),
        },
      },
    })
    lens: Lens,
  ): Promise<void> {
    // renew updateAt
    lens.updateAt = getLocalDateWithTime()
    var oldLen = await this.lensRepository.findById(id)
    var isNotUpdateUrl1 = false, isNotUpdateUrl2 = false
    if (lens.partNo != oldLen.partNo) {
      lens.partNo = lens.partNo.toUpperCase()
      if (fs.existsSync('./public/lensPic/' + lens.partNo + '.png', () => { throw new HttpErrors.BadRequest() })) {
        throw new HttpErrors.BadRequest('料號重複')
      }

      // rename pics
      if (lens.url == undefined) {  // if do not update new url1
        try {
          if (!fs.existsSync('./public' + oldLen.url)) {
            throw new HttpErrors.BadRequest()
          }
          fs.rename('./public' + oldLen.url, './public/lensPic/' + lens.partNo + '.png', () => { });
        } catch{
          throw new HttpErrors.BadRequest('找不到原有圖片，請重新上傳一張新的')
        }
        lens.url = '/lensPic/' + lens.partNo + '.png';
        isNotUpdateUrl1 = true
      }
      if (lens.url2 == undefined) {  // if do not update new url2
        try {
          if (!fs.existsSync('./public' + oldLen.url2)) {
            throw new HttpErrors.BadRequest()
          }
          fs.rename('./public' + oldLen.url2, './public/lensPic_show/' + lens.partNo + '.png', () => { });
        } catch{
          throw new HttpErrors.BadRequest('找不到原有圖片，請重新上傳一張新的')
        }
        lens.url2 = '/lensPic_show/' + lens.partNo + '.png';
        isNotUpdateUrl2 = true
      }
    }

    if (lens.url != undefined && !isNotUpdateUrl1) {  // if upload a new image && partNo is changed
      // delete the old one
      try {
        fs.unlinkSync('./public' + oldLen.url)
      } catch (err) {
        console.log(err)
      }
      // store the new one
      var imgUrl = ''
      try {
        imgUrl = await this.postImg(lens.partNo + '.png', lens.url, '/lensPic/')
      } catch (err) {
        throw new HttpErrors.BadRequest(err)
      }
      // assign the new address to lens
      lens.url = imgUrl

      // update pic version
      lens.picVer = oldLen.picVer + 1;
    }

    if (lens.url2 != undefined && !isNotUpdateUrl2) {  // if upload a new show image && partNo is changed
      // delete the old one
      try {
        fs.unlinkSync('./public' + oldLen.url2)
      } catch (err) {
        console.log(err)
      }
      // store the new one
      var imgUrl2 = ''
      try {
        imgUrl2 = await this.postImg(lens.partNo + '.png', lens.url2, '/lensPic_show/')
      } catch (err) {
        throw new HttpErrors.BadRequest(err)
      }
      // assign the new address to lens
      lens.url2 = imgUrl2

      // update pic version
      lens.picVer = oldLen.picVer + 1;
    }

    // check the state
    var no, state = oldLen.state;
    if (this.compDate(new Date(lens.launchAt), new Date(oldLen.launchAt)) != 0 || this.compDate(new Date(lens.removeAt), new Date(oldLen.removeAt)) != 0) {
      if (this.compDate(new Date(lens.launchAt), nowDate) == 1) {  // not yet released
        no = undefined;
        state = 0;
      } else if (this.compDate(new Date(lens.launchAt), nowDate) == -1 && this.compDate(new Date(lens.removeAt), nowDate) == 1) { // released
        no = nextNo;
        nextNo += 1;
        state = 1;
      } else { //removed
        no = undefined
        state = 2
      }
    }
    if (state != oldLen.state) {
      lens.state = state
      lens.no = no
    }

    await this.lensRepository.updateById(id, lens);
    this.arrangeNo()
  }

  //@authenticate('jwt')
  @patch('/lens/sort/{id1}/{id2}')
  async sort(
    @param.path.string('id1') id1: string,
    @param.path.string('id2') id2: string) {

    let lens1 = await this.lensRepository.findById(id1)
    let lens2 = await this.lensRepository.findById(id2)
    let no1 = lens1.no, no2 = lens2.no

    let lens_t = new Lens()
    lens_t.no = -1
    lens_t.updateAt = getLocalDateWithTime()
    await this.lensRepository.updateById(id1, lens_t, { partial: true })
    lens_t.no = no1
    await this.lensRepository.updateById(id2, lens_t, { partial: true })
    lens_t.no = no2

    await this.lensRepository.updateById(id1, lens_t, { partial: true })

    //console.log(no1, no2, "done")
    return { responses: "exchange order " + no1 + " and " + no2 + " successfully" }
  }

  //@authenticate('jwt')
  @patch('/lens/{id}/name', {
    responses: {
      '204': {
        description: 'Lens PATCH success',
      },
    },
  })
  async updateNameById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lens, { partial: true }),
        },
      },
    })
    lens: Lens,
  ): Promise<void> {
    lens.updateAt = getLocalDateWithTime()
    await this.lensRepository.updateById(id, lens);
  }

  //@authenticate('jwt')
  @del('/lens/{id}', {
    responses: {
      '204': {
        description: 'Lens DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    var lens_t = new Lens()
    lens_t.isdeleted = 1
    lens_t.no = undefined
    await this.lensRepository.updateById(id, lens_t)
  }

  @post('/lens/img/{fileName}')
  async postImg(
    @param.path.string('fileName') filename: string,
    imgData: string,
    url: string
  ): Promise<string> {

    var folder = './public' + url
    // var url = '/lensPic/'

    var res = new Promise<string>((resolve, reject) => {
      if (fs.existsSync(folder + filename)) {
        reject('料號重複')
      }

      try {
        fs.writeFileSync(folder + filename, imgData.split(',')[1], 'base64', () => { })
      } catch (err) {
        reject(err)
      }
      //console.log('postImg: ', url + filename)
      resolve((url + filename))
    })

    return res
  }

  async renewNo() {
    var list = await this.lensRepository.find()
    var date = getLocalDate()
    console.log('renew')

    var promiseList: any[] = []
    list.forEach(async (lens) => {
      var launchAt = new Date(lens.launchAt),
        removeAt = new Date(lens.removeAt);

      // change the state, but do not change the no
      if (this.compDate(launchAt, date) == 1) {  // not yet relesed
        if (lens.no != undefined || lens.state != 0) {
          lens.no = undefined;
          lens.state = 0;
          lens.updateAt = getLocalDateWithTime()
          promiseList.push(this.lensRepository.updateById(lens.id, lens))
        }
      } else if (this.compDate(launchAt, date) != 1 && this.compDate(removeAt, date) == 1) {   // releasing
        if (lens.state != 1) {  // if release at today, give it the first order
          lens.no = nextNo;
          nextNo += 1
          lens.state = 1
          lens.updateAt = getLocalDateWithTime()
          promiseList.push(this.lensRepository.updateById(lens.id, lens))
        }
      } else {  //removed
        if (lens.no != undefined || lens.state != 2) {
          lens.no = undefined;
          lens.state = 2
          lens.updateAt = getLocalDateWithTime()
          promiseList.push(this.lensRepository.updateById(lens.id, lens))
        }
      }
    })

    await Promise.all(promiseList)

    // rearrange no, start from 0 and with no empty
    this.initNextNo()
    await this.arrangeNo()

  }

  async arrangeNo() {
    // put state==1 lens into list
    var list = await this.lensRepository.find({ where: { and: [{ state: 1 }, { isdeleted: 0 }] } })

    list.sort(this.lensComp)
    for (var i = list.length - 1; i >= 0; i--) {
      var len_t = new Lens()
      len_t.no = list.length - i - 1;
      this.lensRepository.updateById(list[i].id, len_t)
    }
  }

  async initNextNo() {
    var array = await this.lensRepository.find({ where: { state: 1 } })
    nextNo = array.length;
    console.log('nextNo:', nextNo)
  }

  static compDate(a: Date, b: Date) {  // 0 if equal, 1 if a>b, -1 if a<b
    var ad = a.valueOf()
    var bd = b.valueOf()
    if (ad == bd) {
      return 0;
    }
    return ad > bd ? 1 : -1
  }

  compDate(a: Date, b: Date) {  // 0 if equal, 1 if a>b, -1 if a<b
    var ad = a.valueOf()
    var bd = b.valueOf()

    if (ad == bd) {
      return 0;
    }
    return ad > bd ? 1 : -1
  }

  lensComp(a: Lens, b: Lens): number {
    if (a.no == undefined && b.no == undefined) {  // not yet release
      if (LensControlController.compDate(new Date(a.launchAt), new Date(b.launchAt)) == 0)
        return 0
      return LensControlController.compDate(new Date(a.launchAt), new Date(b.launchAt)) == 1 ? -1 : 1
    } else if (a.no == undefined || b.no == undefined) {
      if (a.no == undefined)
        return 1
      else
        return 0
    } else {
      if (a.no == b.no)
        return 0
      return a.no > b.no ? -1 : 1
    }
  }
}
