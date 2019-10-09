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
import { UpdateTime } from '../models';
import { UpdateTimeRepository } from '../repositories';
import { validate24hr } from '../services/validator'

export class UpdateTimeController {
  constructor(
    @repository(UpdateTimeRepository)
    public updateTimeRepository: UpdateTimeRepository,
  ) { }
  /*  // only one instance is allowed to exist in the db
    @post('/updateTime', {
      responses: {
        '200': {
          description: 'UpdateTime model instance',
          content: { 'application/json': { schema: getModelSchemaRef(UpdateTime) } },
        },
      },
    })
    async create(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(UpdateTime, { exclude: ['id'] }),
          },
        },
      })
      updateTime: Omit<UpdateTime, 'id'>,
    ): Promise<UpdateTime> {
      return await this.updateTimeRepository.create(updateTime);
    }
  */
  @get('/updateTime/count', {
    responses: {
      '200': {
        description: 'UpdateTime model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(UpdateTime)) where?: Where<UpdateTime>,
  ): Promise<Count> {
    return await this.updateTimeRepository.count(where);
  }

  @get('/updateTime', {
    responses: {
      '200': {
        description: 'Array of UpdateTime model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(UpdateTime) },
          },
        },
      },
    },
  })
  async find(): Promise<UpdateTime> {
    var t = await this.updateTimeRepository.findById('0')
    return t;
  }

  @put('/updateTime', {
    responses: {
      '204': {
        description: 'UpdateTime PUT success',
      },
    },
  })
  async replaceById(
    @requestBody() updateTime: UpdateTime,
  ): Promise<void> {
    validate24hr(updateTime.updateFrom, '更新起始時間錯誤')
    validate24hr(updateTime.updateTo, '更新截止時間錯誤')
    validate24hr(updateTime.updateFreq, '更新頻率錯誤')

    if (updateTime.updateFrom >= updateTime.updateTo) {
      throw new HttpErrors.BadRequest('起始時間需小於終止時間')
    }

    await this.updateTimeRepository.replaceById('0', updateTime);
  }
}
