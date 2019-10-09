import { Request, RestBindings, get, ResponseObject } from '@loopback/rest';
import { inject } from '@loopback/context';
import { UpdateTimeRepository } from '../repositories'
import { repository } from '@loopback/repository';
import { is } from 'type-is';

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          greeting: { type: 'string' },
          date: { type: 'string' },
          url: { type: 'string' },
          headers: {
            type: 'object',
            properties: {
              'Content-Type': { type: 'string' },
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @repository(UpdateTimeRepository) public updateTimeRepository: UpdateTimeRepository) { }

  // Map to `GET /ping`
  @get('/ping', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async ping(): Promise<object> {
    // Reply with a greeting, the current time, the url, and request headers
    var updateTime = await this.updateTimeRepository.findById('0');
    var dt = new Date()
    var hour = dt.getHours()
    var isUpdateTime = updateTime.updateFrom < hour && updateTime.updateTo > hour
    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
      serverIp: '192.168.1.109',
      name: 'Formosa Contact Lens Virtual Wearing System',
      version: '1.0',
      updateFrom: updateTime.updateFrom,
      updateTo: updateTime.updateTo,
      updateFreq: updateTime.updateFreq,
      isUpdateTime: isUpdateTime
    };
  }
}
