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
    updateNameById(id: string, lens: Lens): Promise<void>;
    deleteById(id: string): Promise<void>;
}
