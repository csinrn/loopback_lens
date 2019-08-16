import { Count, Filter, Where } from '@loopback/repository';
import { Userlens } from '../models';
import { UserlensRepository } from '../repositories';
export declare class UserLensControlController {
    userlensRepository: UserlensRepository;
    constructor(userlensRepository: UserlensRepository);
    create(userlens: Userlens): Promise<Userlens>;
    count(where?: Where<Userlens>): Promise<Count>;
    find(filter?: Filter<Userlens>): Promise<Userlens[]>;
    updateAll(userlens: Userlens, where?: Where<Userlens>): Promise<Count>;
    findById(user_id: string): Promise<(Userlens & import("../models").UserlensRelations)[]>;
    updateById(id: number, userlens: Userlens): Promise<void>;
    updateTime(userid: number, lensid: number, userlens: Userlens): Promise<void>;
    updateCount(userid: number, lensid: number, userlens: Userlens): Promise<void>;
    replaceById(id: number, userlens: Userlens): Promise<void>;
    deleteById(id: number): Promise<void>;
}
