import { DefaultCrudRepository } from '@loopback/repository';
import { UpdateTime, UpdateTimeRelations } from '../models';
import { LensDataSource } from '../datasources';
export declare class UpdateTimeRepository extends DefaultCrudRepository<UpdateTime, typeof UpdateTime.prototype.id, UpdateTimeRelations> {
    constructor(dataSource: LensDataSource);
}
