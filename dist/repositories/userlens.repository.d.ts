import { DefaultCrudRepository } from '@loopback/repository';
import { Userlens, UserlensRelations } from '../models';
import { LensDataSource } from '../datasources';
export declare class UserlensRepository extends DefaultCrudRepository<Userlens, typeof Userlens.prototype.userid, UserlensRelations> {
    constructor(dataSource: LensDataSource);
}
