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
          schema: getModelSchemaRef(Lens, { exclude: ['id'] }),
        },
      },
    })
    lens: Omit<Lens, 'id'>,
  ): Promise<Lens> {
    if (!lens) {
      throw HttpErrors.BadRequest;
    }
    validateDate(lens.createAt);
    if (lens.updateAt != undefined) {
      validateDate(lens.updateAt);
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
      imgUrl = await this.postImg(lens.name + '.png', lens.url)
      lens.url = imgUrl
    } catch (err) {
      throw new HttpErrors.BadRequest(err)
    }

    // store lens, delete image and throw if error
    var count = await this.lensRepository.count()
    lens.no = count.count

    var res = await this.lensRepository.create(lens).catch((err) => {
      fs.unlinkSync('./public' + imgUrl)
      return err
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
}
