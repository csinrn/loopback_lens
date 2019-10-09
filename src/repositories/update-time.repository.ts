import {DefaultCrudRepository} from '@loopback/repository';
import {UpdateTime, UpdateTimeRelations} from '../models';
import {LensDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UpdateTimeRepository extends DefaultCrudRepository<
  UpdateTime,
  typeof UpdateTime.prototype.id,
  UpdateTimeRelations
> {
  constructor(
    @inject('datasources.lens') dataSource: LensDataSource,
  ) {
    super(UpdateTime, dataSource);
  }
}
