import { Entity } from '@loopback/repository';
export declare class IrisPoints extends Entity {
    id: string;
    userId: string;
    leftpupilX: number;
    leftpupilY: number;
    rightpupilX: number;
    rightpupilY: number;
    irisRadius: number;
    [prop: string]: any;
    constructor(data?: Partial<IrisPoints>);
}
export interface IrisPointsRelations {
}
export declare type IrisPointsWithRelations = IrisPoints & IrisPointsRelations;
