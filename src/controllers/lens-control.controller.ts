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
import { Lens } from '../models';
import { LensRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { validateDate, validateEnum, validateBoolean } from '../services/validator';


export class LensControlController {
  constructor(
    @repository(LensRepository)
    public lensRepository: LensRepository,
  ) { }

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
    validateDate(lens.launchat);
    if (lens.updateat != undefined) {
      validateDate(lens.closeat);
    }
    validateEnum(lens.wearingtime)
    validateBoolean(lens.newtag, "newtag")
    validateBoolean(lens.hotsaletag, "hotsaletag")
    validateBoolean(lens.onsaletag, "onsaletag")

    return await this.lensRepository.create(lens);
  }

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
    return await this.lensRepository.find(filter);
  }

  @get('/lens/{id}', {
    responses: {
      '200': {
        description: 'Lens model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Lens) } },
      },
    },
  })
  @authenticate('jwt')
  async findById(@param.path.string('id') id: string): Promise<Lens> {
    return await this.lensRepository.findById(id);
  }

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

  @put('/lens/{id}', {
    responses: {
      '204': {
        description: 'Lens PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() lens: Lens,
  ): Promise<void> {
    await this.lensRepository.replaceById(id, lens);
  }

  @del('/lens/{id}', {
    responses: {
      '204': {
        description: 'Lens DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.lensRepository.deleteById(id);
  }
}
