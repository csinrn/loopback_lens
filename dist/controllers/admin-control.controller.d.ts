import { Admin } from '../models';
import { AdminRepository } from '../repositories';
import { TokenService, UserService } from '@loopback/authentication';
import { Count, Where } from '@loopback/repository';
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
        userProfile: {
            account: string;
            name: string;
            isAdmin: number;
        };
    }>;
    logout(): Promise<{
        responses: {
            description: string;
        };
    }>;
    count(where?: Where<Admin>): Promise<Count>;
    updateById(id: string, admin: Admin): Promise<void>;
    deleteById(id: string): Promise<void>;
}
