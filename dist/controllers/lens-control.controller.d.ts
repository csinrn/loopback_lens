import { Count, Filter, Where } from '@loopback/repository';
import { Lens } from '../models';
import { LensRepository } from '../repositories';
export declare class LensControlController {
    lensRepository: LensRepository;
    constructor(lensRepository: LensRepository);
    create(lens: Lens): Promise<Lens>;
    count(where?: Where<Lens>): Promise<Count>;
    find(filter?: Filter<Lens>): Promise<Lens[]>;
    findbase64(filter?: Filter<Lens>): Promise<Lens[]>;
    updateById(id: string, lens: Lens): Promise<void>;
    sort(id1: string, id2: string): Promise<{
        responses: string;
    }>;
    updateNameById(id: string, lens: Lens): Promise<void>;
    test(): Promise<(Lens & import("../models").LensRelations)[]>;
    deleteById(id: string): Promise<void>;
    postImg(filename: string, imgData: string): Promise<string>;
    renewNo(): Promise<void>;
    arrangeNo(): Promise<void>;
    initNextNo(): Promise<void>;
    compDate(a: Date, b: Date): 0 | 1 | -1;
    lensComp(a: Lens, b: Lens): number;
}
