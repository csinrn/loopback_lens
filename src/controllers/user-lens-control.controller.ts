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
import { UserlensRepository } from '../repositories';
import { validateDate } from '../services/validator';
import { resolve } from 'url';

export class UserLensControlController {
  constructor(
    @repository(UserlensRepository)
    public userlensRepository: UserlensRepository,
  ) { }

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
    validateDate(userlens.createat);
    if (userlens.updateat != undefined) {
      validateDate(userlens.updateat);
    }
    return await this.userlensRepository.create(userlens);
  }

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
    return await this.userlensRepository.updateAll(userlens, where);
  }

  @get('/user/{user_id}', {
    responses: {
      '200': {
        description: 'Userlens model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Userlens) } },
      },
    },
  })
  async findById(@param.path.string('user_id') user_id: string) {
    return await this.userlensRepository.find({ where: { userid: user_id } });
  }

  @patch('/user/{id}', {
    responses: {
      '204': {
        description: 'Userlens PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userlens, { partial: true }),
        },
      },
    })
    userlens: Userlens,
  ): Promise<void> {
    await this.userlensRepository.updateById(id, userlens);
  }


  /////
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
          { lensid: lensid },
          { userid: userid }
        ]
      }
    })
    if (!dat) throw new HttpErrors.NotFound('userID not found')
    if (dat.id == undefined) throw new HttpErrors.NotFound('id property not found')

    console.log(dat)
    await this.userlensRepository.updateById(dat.id, userlens)
  }

  @patch('/user/{user_id}/{lens_id}/count', {
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
    let user = await this.userlensRepository.findOne({ where: { and: [{ userid: userid }, { lensid: lensid }] } })
    if (!user) throw new HttpErrors.NotFound('user not found')
    if (user.id == undefined) throw new HttpErrors.NotFound('id undefined')
    if (user.lenscount == undefined) throw new HttpErrors.NotFound('lensCount undefined')

    user.lenscount = user.lenscount + 1
    await this.userlensRepository.updateById(user.id, user);
  }

  /////

  @put('/user/{id}', {
    responses: {
      '204': {
        description: 'Userlens PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: number,
    @requestBody() userlens: Userlens,
  ): Promise<void> {
    await this.userlensRepository.replaceById(id, userlens);
  }

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
