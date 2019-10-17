import {DefaultCrudRepository} from '@loopback/repository';
import {IrisPoints, IrisPointsRelations} from '../models';
import {LensDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class IrisPointsRepository extends DefaultCrudRepository<
  IrisPoints,
  typeof IrisPoints.prototype.id,
  IrisPointsRelations
> {
  constructor(
    @inject('datasources.lens') dataSource: LensDataSource,
  ) {
    super(IrisPoints, dataSource);
  }
}
