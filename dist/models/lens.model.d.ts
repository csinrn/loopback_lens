import { Entity } from '@loopback/repository';
export declare class Lens extends Entity {
    id: number;
    lenspic: string;
    name: string;
    diameter: number;
    bc: number;
    power: number;
    water: number;
    wearingtime: string;
    placeofprod: string;
    price: number;
    specialprice: number;
    eventdisp?: string;
    license: string;
    newtag: number;
    hotsaletag: number;
    onsaletag: number;
    launchat: string;
    closeat?: string;
    url?: string;
    [prop: string]: any;
    constructor(data?: Partial<Lens>);
}
export interface LensRelations {
}
export declare type LensWithRelations = Lens & LensRelations;
