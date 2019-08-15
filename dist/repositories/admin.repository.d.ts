import { DefaultCrudRepository } from '@loopback/repository';
import { Admin, AdminRelations } from '../models';
import { LensDataSource } from '../datasources';
export declare type Credentials = {
    account: string;
    password: string;
};
export declare class AdminRepository extends DefaultCrudRepository<Admin, typeof Admin.prototype.account, AdminRelations> {
    constructor(dataSource: LensDataSource);
}
