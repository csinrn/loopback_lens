import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
  AndClause
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
import { Userlens } from '../models';
import { UserlensRepository, LensRepository } from '../repositories';
import { validateDate } from '../services/validator';
import { resolve } from 'url';
import { authenticate } from '@loopback/authentication';

export class UserLensControlController {
  constructor(
    @repository(UserlensRepository)
    public userlensRepository: UserlensRepository,
    @repository(LensRepository)
    public lensRepository: LensRepository,
  ) { }

  //@authenticate('jwt')
  @post('/user', {
    responses: {
      '200': {
        description: 'Userlens model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Userlens) } },
      },
    },
  })
  async create(
    @requestBody()
    userlens: Userlens
  ): Promise<Userlens> {
    console.log(userlens);
    try {
      var t = await this.lensRepository.findById(userlens.lensId)
    } catch (err) {
      console.log(err)
      throw new HttpErrors.NotFound('找不到隱型眼鏡 id=' + userlens.lensId)
    }
    return await this.userlensRepository.create(userlens);
  }

  //@authenticate('jwt')
  @get('/user/count', {
    responses: {
      '200': {
        description: 'Userlens model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Userlens)) where?: Where<Userlens>,
  ): Promise<Count> {
    return await this.userlensRepository.count(where);
  }

  //@authenticate('jwt')
  @get('/user', {
    responses: {
      '200': {
        description: 'Array of Userlens model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Userlens) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Userlens)) filter?: Filter<Userlens>,
  ): Promise<Userlens[]> {
    return await this.userlensRepository.find(filter);
  }

  //@authenticate('jwt')
  @patch('/user', {
    responses: {
      '200': {
        description: 'Userlens PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userlens, { partial: true }),
        },
      },
    })
    userlens: Userlens,
    @param.query.object('where', getWhereSchemaFor(Userlens)) where?: Where<Userlens>,
  ): Promise<Count> {
    try {
      var t = await this.lensRepository.findById(userlens.lensId)
    } catch (err) {
      console.log(err)
      throw new HttpErrors.NotFound('找不到隱型眼鏡 id=' + userlens.lensId)
    }
    return await this.userlensRepository.updateAll(userlens, where);
  }

  //@authenticate('jwt')
  @get('/user/{user_id}', {
    responses: {
      '200': {
        description: 'Userlens model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Userlens) } },
      },
    },
  })
  async findById(@param.path.string('user_id') user_id: string) {
    return await this.userlensRepository.find({ where: { userId: user_id } });
  }


  /////
  //@authenticate('jwt')
  @patch('/user/{user_id}/{lens_id}/time', {
    responses: {
      '204': {
        description: 'Userlens PATCH success',
      },
    },
  })
  async updateTime(
    @param.path.string('user_id') userid: number,
    @param.path.string('lens_id') lensid: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userlens, { partial: true }),
        },
      },
    })
    userlens: Userlens,
  ): Promise<void> {
    let dat = await this.userlensRepository.findOne({
      where: {
        and: [
          { lensId: lensid },
          { userId: userid }
        ]
      }
    })
    if (!dat) throw new HttpErrors.NotFound('userID not found')
    if (dat.id == undefined) throw new HttpErrors.NotFound('id property not found')

    console.log(dat)
    dat.lensTime = userlens.lensTime
    await this.userlensRepository.updateById(dat.id, dat)
  }

  //@authenticate('jwt')
  @patch('/user/{user_id}/{lens_id}/addcount', {
    responses: {
      '204': {
        description: 'Userlens PATCH success',
      },
    },
  })
  async updateCount(
    @param.path.string('user_id') userid: number,
    @param.path.string('lens_id') lensid: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userlens, { partial: true }),
        },
      },
    })
    userlens: Userlens,
  ): Promise<void> {
    //console.log(userlens)
    let user = await this.userlensRepository.findOne({ where: { and: [{ userId: userid }, { lensId: lensid }] } })
    if (!user) throw new HttpErrors.NotFound('user not found')
    if (user.id == undefined) throw new HttpErrors.NotFound('id undefined')
    if (user.lensCount == undefined) throw new HttpErrors.NotFound('lensCount undefined')

    user.lensCount = user.lensCount + 1
    await this.userlensRepository.updateById(user.id, user);
  }

  /////
  //@authenticate('jwt')
  @del('/user/{id}', {
    responses: {
      '204': {
        description: 'Userlens DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: number): Promise<void> {
    await this.userlensRepository.deleteById(id);
  }
}
