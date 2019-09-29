import { Entity } from '@loopback/repository';
export declare class Lens extends Entity {
    id: number;
    name: string;
    no?: number;
    diameter: number;
    bc: number;
    powerL: number;
    powerH: number;
    water: number;
    daily: number;
    biweekly: number;
    monthly: number;
    placeOfProd: string;
    price: number;
    package: number;
    specialPrice: number;
    eventDisp?: string;
    license: string;
    newTag: number;
    hotsaleTag: number;
    onsaleTag: number;
    createAt: Date;
    launchAt: Date;
    removeAt: Date;
    url?: string;
    state: number;
    [prop: string]: any;
    constructor(data?: Partial<Lens>);
}
export interface LensRelations {
}
export declare type LensWithRelations = Lens & LensRelations;
