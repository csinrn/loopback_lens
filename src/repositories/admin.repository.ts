import { DefaultCrudRepository } from '@loopback/repository';
import { Admin, AdminRelations } from '../models';
import { LensDataSource } from '../datasources';
import { inject } from '@loopback/core';

export type Credentials = {
  account: string;
  password: string;
};

export class AdminRepository extends DefaultCrudRepository<
  Admin,
  typeof Admin.prototype.account,
  AdminRelations
  > {
  constructor(
    @inject('datasources.lens') dataSource: LensDataSource,
  ) {
    super(Admin, dataSource);
  }
}
