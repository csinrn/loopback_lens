import { Entity } from '@loopback/repository';
export declare class Admin extends Entity {
    account: string;
    password: string;
    creatat: string;
    name: string;
    [prop: string]: any;
    constructor(data?: Partial<Admin>);
}
export interface AdminRelations {
}
export declare type AdminWithRelations = Admin & AdminRelations;
