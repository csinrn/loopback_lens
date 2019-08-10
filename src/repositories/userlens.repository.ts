import {DefaultCrudRepository} from '@loopback/repository';
import {Userlens, UserlensRelations} from '../models';
import {LensDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserlensRepository extends DefaultCrudRepository<
  Userlens,
  typeof Userlens.prototype.userid,
  UserlensRelations
> {
  constructor(
    @inject('datasources.lens') dataSource: LensDataSource,
  ) {
    super(Userlens, dataSource);
  }
}
