import { Entity } from '@loopback/repository';
export declare class UpdateTime extends Entity {
    id: string;
    updateFrom: number;
    updateTo: number;
    updateFreq: number;
    [prop: string]: any;
    constructor(data?: Partial<UpdateTime>);
}
export interface UpdateTimeRelations {
}
export declare type UpdateTimeWithRelations = UpdateTime & UpdateTimeRelations;
