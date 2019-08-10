import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './lens.datasource.json';

export class LensDataSource extends juggler.DataSource {
  static dataSourceName = 'lens';

  constructor(
    @inject('datasources.config.lens', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
