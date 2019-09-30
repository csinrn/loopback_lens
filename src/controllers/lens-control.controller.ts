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


var nowDate = new Date('180928');//new Date().getDate()
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

    // store image, throw if error
    var imgUrl = ''
    try {
      imgUrl = await this.postImg(lens.partNo + '.png', lens.url)
      lens.url = imgUrl
    } catch (err) {
      throw new HttpErrors.BadRequest(err)
    }

    // Capitalize partNo
    lens.partNo = lens.partNo.toUpperCase()

    // assign part and no fields
    if (this.compDate(new Date(lens.launchAt), nowDate) == 1) {  // not yet released
      lens.no = undefined;
      lens.state = 0;
    } else if (this.compDate(new Date(lens.launchAt), nowDate) == -1 && this.compDate(new Date(lens.removeAt), nowDate) == 1) { // released
      lens.no = nextNo;
      nextNo += 1;
      console.log('nextNo:', nextNo)
      lens.state = 1;
    } else { //removed
      lens.no = undefined
      lens.state = 2
    }

    // store lens, delete image and throw if error
    var res = await this.lensRepository.create(lens).catch((err) => {
      fs.unlinkSync('./public' + imgUrl)
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
  ): Promise<Lens[]> {
    var list = await this.lensRepository.find(filter)

    var date = new Date()
    if (this.compDate(nowDate, date) != 0) {
      await this.renewNo(list)
      nowDate = new Date()
    }

    list = await this.lensRepository.find(filter)
    return list;
  }

  //@authenticate('jwt')
  @patch('/lens/{id}', {
    responses: {
      '204': {
        description: 'Lens PATCH success',
      },
    },
  })
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
    lens.updateAt = new Date()
    await this.lensRepository.updateById(id, lens);
  }

  //@authenticate('jwt')
  @patch('/lens/sort/{id1}/{id2}')
  async sort(
    @param.path.string('id1') id1: string,
    @param.path.string('id2') id2: string) {

    let lens1 = await this.lensRepository.findById(parseInt(id1))
    let lens2 = await this.lensRepository.findById(parseInt(id2))
    let no1 = lens1.no, no2 = lens2.no
    //console.log("id1: ", id1, no1)
    //console.log("id2: ", id2, no2)

    let lens_t = new Lens()
    lens_t.no = -1
    lens_t.updateAt = new Date()
    await this.lensRepository.updateById(parseInt(id1), lens_t, { partial: true })
    lens_t.no = no1
    await this.lensRepository.updateById(parseInt(id2), lens_t, { partial: true })
    lens_t.no = no2
    await this.lensRepository.updateById(parseInt(id1), lens_t, { partial: true })
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
    lens.updateAt = new Date()
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
    var lens = await this.lensRepository.findById(id)
    //console.log('./public' + lens.url)
    try {
      fs.unlinkSync('./public' + lens.url)
    } catch (err) {
      console.log('Can not delete picture ' + './public' + lens.url + ', picture does not exist')
    }
    //console.log('delete img f')
    await this.lensRepository.deleteById(id);
    nextNo -= 1
    console.log('nextNo:', nextNo)

  }

  @post('/lens/img/{fileName}')
  async postImg(
    @param.path.string('fileName') filename: string,
    imgData: string
  ): Promise<string> {

    var folder = './public/lensPic/'
    var url = '/lensPic/'

    var res = new Promise<string>((resolve, reject) => {
      if (fs.existsSync(folder + filename)) {
        reject('image name duplicated')
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

  async renewNo(list: Lens[]) {
    var dt = new Date()
    var date = parseInt(this.getDateString(dt))

    var releasingList: Lens[] = []
    var promiseList: any[] = []
    list.forEach(async (lens) => {
      var launchAt = parseInt(this.getDateString(lens.launchAt)),
        removeAt = parseInt(this.getDateString(lens.removeAt));
      console.log('launchAt:', launchAt)

      if (launchAt > date) {  // not yet relesed
        if (lens.no != undefined || lens.state != 0) {
          lens.no = undefined;
          lens.state = 0;
          lens.updateAt = new Date()
          promiseList.push(this.lensRepository.updateById(lens.partNo, lens))
        }
      } else if (launchAt <= date && removeAt > date) {   // releasing
        lens.state = 1
        lens.updateAt = new Date()
        releasingList.push(lens)
      } else {  //removed
        if (lens.no != undefined || lens.state != 2) {
          lens.no = undefined;
          lens.state = 2
          lens.updateAt = new Date()
          promiseList.push(this.lensRepository.updateById(lens.partNo, lens))
        }
      }
    })

    // rearrange no, start from 0 and with no empty
    releasingList.sort(this.lensComp)
    console.log(releasingList)

    var i = 0;
    releasingList.forEach((lens) => {
      if (lens.no != i) {
        lens.no = i
        promiseList.push(this.lensRepository.updateById(lens.partNo, lens))
      }
      i++
    })

    // fire all update
    await Promise.all(promiseList)
    nextNo = i
    console.log(nextNo)
  }

  lensComp(a: Lens, b: Lens): number {
    if (a.no == undefined && b.no == undefined) {
      if (parseInt(this.getDateString(a.launchAt)) == parseInt(this.getDateString(a.launchAt)))
        return 0
      return parseInt(this.getDateString(a.launchAt)) > parseInt(this.getDateString(b.launchAt)) ? -1 : 1
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

  getDateString(dt: Date) {
    var year = dt.getFullYear().toString(),
      month = (dt.getMonth() + 1).toString(),
      day = dt.getDate().toString();
    year = year[2] + year[3]
    month = (month.length == 1) ? '0' + month : month
    day = (day.length == 1) ? '0' + day : day
    return (year + month + day).toString()
  }

  compDate(a: Date, b: Date) {  // 0 if equal, 1 if a>b, -1 if a<b
    var ad = Date.parse(a.toDateString()).valueOf()
    var bd = Date.parse(b.toDateString()).valueOf()

    if (ad == bd) {
      return 0;
    }
    return ad > bd ? 1 : -1
  }
}
