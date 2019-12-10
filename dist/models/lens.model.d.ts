import { Entity } from '@loopback/repository';
export declare class Lens extends Entity {
    id: number;
    partNo: string;
    name: string;
    series: string;
    brand: string;
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
    createAt: string;
    launchAt: Date;
    removeAt: Date;
    updateAt: string;
    url: string;
    url2: string;
    state: number;
    picVer: number;
    isdeleted: number;
    [prop: string]: any;
    constructor(data?: Partial<Lens>);
}
export interface LensRelations {
}
export declare type LensWithRelations = Lens & LensRelations;
