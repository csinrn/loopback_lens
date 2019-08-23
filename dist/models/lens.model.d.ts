import { Entity } from '@loopback/repository';
export declare class Lens extends Entity {
    id: number;
    name: string;
    no: number;
    diameter: number;
    bc: number;
    power: number;
    water: number;
    wearingTime: string;
    placeOfProd: string;
    price: number;
    specialPrice: number;
    eventDisp?: string;
    license: string;
    newTag: number;
    hotsaleTag: number;
    onsaleTag: number;
    createAt: string;
    updateAt?: string;
    url?: string;
    [prop: string]: any;
    constructor(data?: Partial<Lens>);
}
export interface LensRelations {
}
export declare type LensWithRelations = Lens & LensRelations;
