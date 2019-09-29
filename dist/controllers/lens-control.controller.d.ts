import { Count, Filter, Where } from '@loopback/repository';
import { Lens } from '../models';
import { LensRepository } from '../repositories';
export declare class LensControlController {
    lensRepository: LensRepository;
    constructor(lensRepository: LensRepository);
    create(lens: Omit<Lens, 'id'>): Promise<Lens>;
    count(where?: Where<Lens>): Promise<Count>;
    find(filter?: Filter<Lens>): Promise<Lens[]>;
    updateById(id: string, lens: Lens): Promise<void>;
    sort(id1: string, id2: string): Promise<{
        responses: string;
    }>;
    updateNameById(id: string, lens: Lens): Promise<void>;
    deleteById(id: string): Promise<void>;
    postImg(filename: string, imgData: string): Promise<string>;
    renewNo(list: Lens[]): Promise<void>;
    lensComp(a: Lens, b: Lens): number;
    getDateString(dt: Date): string;
    compDate(a: Date, b: Date): 0 | 1 | -1;
}
