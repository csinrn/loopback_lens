import { Entity } from '@loopback/repository';
export declare class Admin extends Entity {
    account: string;
    password: string;
    name: string;
    creatat?: number;
    [prop: string]: any;
    constructor(data?: Partial<Admin>);
}
export interface AdminRelations {
}
export declare type AdminWithRelations = Admin & AdminRelations;
