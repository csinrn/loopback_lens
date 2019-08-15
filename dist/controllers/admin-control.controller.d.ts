import { Admin } from '../models';
import { AdminRepository } from '../repositories';
import { UserProfile, TokenService, UserService } from '@loopback/authentication';
import { Count, Filter, Where } from '@loopback/repository';
import { Credentials } from '../repositories/admin.repository';
import { PasswordHasher } from '../services/hash.password.bcryptjs';
export declare class AdminControlController {
    adminRepository: AdminRepository;
    passwordHasher: PasswordHasher;
    jwtService: TokenService;
    userService: UserService<Admin, Credentials>;
    constructor(adminRepository: AdminRepository, passwordHasher: PasswordHasher, jwtService: TokenService, userService: UserService<Admin, Credentials>);
    create(admin: Admin): Promise<Admin>;
    login(credentials: Credentials): Promise<{
        token: string;
    }>;
    printCurrentUser(currentUserProfile: UserProfile): Promise<UserProfile>;
    count(where?: Where<Admin>): Promise<Count>;
    find(filter?: Filter<Admin>): Promise<Admin[]>;
    updateAll(admin: Admin, where?: Where<Admin>): Promise<Count>;
    findById(id: string): Promise<Admin>;
    updateById(id: string, admin: Admin): Promise<void>;
    replaceById(id: string, admin: Admin): Promise<void>;
    deleteById(id: string): Promise<void>;
}
