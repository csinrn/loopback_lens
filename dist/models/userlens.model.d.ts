import { Entity } from '@loopback/repository';
export declare class Userlens extends Entity {
    id?: number;
    userid: string;
    lensid?: string;
    lenscount?: number;
    lenstime?: number;
    createat: string;
    updateat: string;
    [prop: string]: any;
    constructor(data?: Partial<Userlens>);
}
export interface UserlensRelations {
}
export declare type UserlensWithRelations = Userlens & UserlensRelations;
