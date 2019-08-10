import { juggler } from '@loopback/repository';
export declare class LensDataSource extends juggler.DataSource {
    static dataSourceName: string;
    constructor(dsConfig?: object);
}
