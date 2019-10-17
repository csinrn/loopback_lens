import { Count, Filter, Where } from '@loopback/repository';
import { IrisPoints } from '../models';
import { IrisPointsRepository } from '../repositories';
export declare class IrisPointController {
    irisPointsRepository: IrisPointsRepository;
    constructor(irisPointsRepository: IrisPointsRepository);
    create(irisPoints: Omit<IrisPoints, 'id'>): Promise<IrisPoints>;
    count(where?: Where<IrisPoints>): Promise<Count>;
    find(filter?: Filter<IrisPoints>): Promise<IrisPoints[]>;
    updateAll(irisPoints: IrisPoints, where?: Where<IrisPoints>): Promise<Count>;
    findById(id: string): Promise<IrisPoints>;
    updateById(id: string, irisPoints: IrisPoints): Promise<void>;
    replaceById(id: string, irisPoints: IrisPoints): Promise<void>;
    deleteById(id: string): Promise<void>;
}
