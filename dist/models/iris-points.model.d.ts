import { Entity } from '@loopback/repository';
export declare class IrisPoints extends Entity {
    userId?: Number;
    leftirisX?: Number;
    leftirisY?: Number;
    rightirisX?: Number;
    rightirisY?: Number;
    [prop: string]: any;
    constructor(data?: Partial<IrisPoints>);
}
export interface IrisPointsRelations {
}
export declare type IrisPointsWithRelations = IrisPoints & IrisPointsRelations;
