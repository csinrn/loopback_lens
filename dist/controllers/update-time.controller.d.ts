import { Count, Where } from '@loopback/repository';
import { UpdateTime } from '../models';
import { UpdateTimeRepository } from '../repositories';
export declare class UpdateTimeController {
    updateTimeRepository: UpdateTimeRepository;
    constructor(updateTimeRepository: UpdateTimeRepository);
    count(where?: Where<UpdateTime>): Promise<Count>;
    find(): Promise<UpdateTime>;
    replaceById(updateTime: UpdateTime): Promise<void>;
}
