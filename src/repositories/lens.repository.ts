import {DefaultCrudRepository} from '@loopback/repository';
import {Lens, LensRelations} from '../models';
import {LensDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class LensRepository extends DefaultCrudRepository<
  Lens,
  typeof Lens.prototype.lensid,
  LensRelations
> {
  constructor(
    @inject('datasources.lens') dataSource: LensDataSource,
  ) {
    super(Lens, dataSource);
  }
}
