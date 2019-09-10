import { Count, Filter, Where } from '@loopback/repository';
import { Lens, ImageStorage } from '../models';
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
    postImg(filename: string, imgData: ImageStorage): Promise<object>;
}
