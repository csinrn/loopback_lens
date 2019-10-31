import { Count, Filter, Where } from '@loopback/repository';
import { Lens } from '../models';
import { LensRepository } from '../repositories';
export declare class LensControlController {
    lensRepository: LensRepository;
    constructor(lensRepository: LensRepository);
    create(lens: Lens): Promise<Lens>;
    count(where?: Where<Lens>): Promise<Count>;
    time(): Promise<{
        newDate: Date;
        getLocalDate: Date;
        getLocalDateWithTime: Date;
    }>;
    find(filter?: Filter<Lens>): Promise<(Lens & import("../models").LensRelations)[]>;
    findbase64(filter?: Filter<Lens>): Promise<Lens[]>;
    updateById(id: string, lens: Lens): Promise<void>;
    sort(id1: string, id2: string): Promise<{
        responses: string;
    }>;
    updateNameById(id: string, lens: Lens): Promise<void>;
    deleteById(id: string): Promise<void>;
    postImg(filename: string, imgData: string, url: string): Promise<string>;
    renewNo(): Promise<void>;
    arrangeNo(): Promise<void>;
    initNextNo(): Promise<void>;
    static compDate(a: Date, b: Date): 1 | 0 | -1;
    compDate(a: Date, b: Date): 1 | 0 | -1;
    lensComp(a: Lens, b: Lens): number;
}
