import { DefaultCrudRepository } from '@loopback/repository';
import { Lens, LensRelations } from '../models';
import { LensDataSource } from '../datasources';
export declare class LensRepository extends DefaultCrudRepository<Lens, typeof Lens.prototype.lensid, LensRelations> {
    constructor(dataSource: LensDataSource);
}
