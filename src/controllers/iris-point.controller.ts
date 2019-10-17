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
} from '@loopback/rest';
import { IrisPoints } from '../models';
import { IrisPointsRepository } from '../repositories';

export class IrisPointController {
  constructor(
    @repository(IrisPointsRepository)
    public irisPointsRepository: IrisPointsRepository,
  ) { }

  @post('/iris', {
    responses: {
      '200': {
        description: 'IrisPoints model instance',
        content: { 'application/json': { schema: getModelSchemaRef(IrisPoints) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IrisPoints, { exclude: ['id'] }),
        },
      },
    })
    irisPoints: Omit<IrisPoints, 'id'>,
  ): Promise<IrisPoints> {
    return await this.irisPointsRepository.create(irisPoints);
  }

  @get('/iris/count', {
    responses: {
      '200': {
        description: 'IrisPoints model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(IrisPoints)) where?: Where<IrisPoints>,
  ): Promise<Count> {
    return await this.irisPointsRepository.count(where);
  }

  @get('/iris', {
    responses: {
      '200': {
        description: 'Array of IrisPoints model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(IrisPoints) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(IrisPoints)) filter?: Filter<IrisPoints>,
  ): Promise<IrisPoints[]> {
    return await this.irisPointsRepository.find(filter);
  }

  @patch('/iris', {
    responses: {
      '200': {
        description: 'IrisPoints PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IrisPoints, { partial: true }),
        },
      },
    })
    irisPoints: IrisPoints,
    @param.query.object('where', getWhereSchemaFor(IrisPoints)) where?: Where<IrisPoints>,
  ): Promise<Count> {
    return await this.irisPointsRepository.updateAll(irisPoints, where);
  }

  @get('/iris/{id}', {
    responses: {
      '200': {
        description: 'IrisPoints model instance',
        content: { 'application/json': { schema: getModelSchemaRef(IrisPoints) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<IrisPoints> {
    return await this.irisPointsRepository.findById(id);
  }

  @patch('/iris/{id}', {
    responses: {
      '204': {
        description: 'IrisPoints PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IrisPoints, { partial: true }),
        },
      },
    })
    irisPoints: IrisPoints,
  ): Promise<void> {
    await this.irisPointsRepository.updateById(id, irisPoints);
  }

  @put('/iris/{id}', {
    responses: {
      '204': {
        description: 'IrisPoints PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() irisPoints: IrisPoints,
  ): Promise<void> {
    await this.irisPointsRepository.replaceById(id, irisPoints);
  }

  @del('/iris/{id}', {
    responses: {
      '204': {
        description: 'IrisPoints DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.irisPointsRepository.deleteById(id);
  }
}
