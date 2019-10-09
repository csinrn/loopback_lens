/// <reference types="express" />
import { Request } from '@loopback/rest';
import { UpdateTimeRepository } from '../repositories';
/**
 * A simple controller to bounce back http requests
 */
export declare class PingController {
    private req;
    updateTimeRepository: UpdateTimeRepository;
    constructor(req: Request, updateTimeRepository: UpdateTimeRepository);
    ping(): Promise<object>;
}
