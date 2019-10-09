import { Credentials } from '../repositories/admin.repository';
export declare function validateCredentials(credentials: Credentials): void;
export declare function validate24hr(time: number, errMsg: string): number;
export declare function validateDate(date: string): void;
export declare function validateBoolean(input: number, para: string): void;
