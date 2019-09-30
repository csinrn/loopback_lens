import { Entity } from '@loopback/repository';
export declare class Userlens extends Entity {
    id: number;
    userId: number;
    lensId: number;
    lensCount: number;
    lensTime?: number;
    createAt: Date;
    updateAt?: Date;
    [prop: string]: any;
    constructor(data?: Partial<Userlens>);
}
export interface UserlensRelations {
}
export declare type UserlensWithRelations = Userlens & UserlensRelations;
