import { Entity } from '@loopback/repository';
export declare class Userlens extends Entity {
    id: number;
    userId: string;
    lensId: number;
    lensCount: number;
    lensTime: number;
    createAt: Date;
    updateAt: Date;
    isCustomer: number;
    [prop: string]: any;
    constructor(data?: Partial<Userlens>);
}
export interface UserlensRelations {
}
export declare type UserlensWithRelations = Userlens & UserlensRelations;
