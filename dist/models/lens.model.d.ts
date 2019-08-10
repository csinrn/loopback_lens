import { Entity } from '@loopback/repository';
export declare class Lens extends Entity {
    lensid: string;
    lenspic: number[];
    lensname: string;
    createat: string;
    updateat: string;
    [prop: string]: any;
    constructor(data?: Partial<Lens>);
}
export interface LensRelations {
}
export declare type LensWithRelations = Lens & LensRelations;
