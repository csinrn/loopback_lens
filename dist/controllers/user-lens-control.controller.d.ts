import { Count, Filter, Where } from '@loopback/repository';
import { Userlens } from '../models';
import { UserlensRepository, LensRepository } from '../repositories';
export declare class UserLensControlController {
    userlensRepository: UserlensRepository;
    lensRepository: LensRepository;
    constructor(userlensRepository: UserlensRepository, lensRepository: LensRepository);
    create(userlens: Userlens): Promise<Userlens>;
    count(where?: Where<Userlens>): Promise<Count>;
    find(filter?: Filter<Userlens>): Promise<Userlens[]>;
    updateAll(userlens: Userlens, where?: Where<Userlens>): Promise<Count>;
    findById(user_id: string): Promise<(Userlens & import("../models").UserlensRelations)[]>;
    updateTime(userid: number, lensid: number, userlens: Userlens): Promise<void>;
    updateCount(userid: number, lensid: number, userlens: Userlens): Promise<void>;
    deleteById(id: number): Promise<void>;
    addRecord(userLens: Userlens): Promise<string>;
}
