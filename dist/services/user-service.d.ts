import { Credentials, AdminRepository } from '../repositories/admin.repository';
import { Admin } from '../models/admin.model';
import { UserService, UserProfile } from '@loopback/authentication';
import { PasswordHasher } from './hash.password.bcryptjs';
export declare class MyUserService implements UserService<Admin, Credentials> {
    userRepository: AdminRepository;
    passwordHasher: PasswordHasher;
    constructor(userRepository: AdminRepository, passwordHasher: PasswordHasher);
    verifyCredentials(credentials: Credentials): Promise<Admin>;
    convertToUserProfile(admin: Admin): UserProfile;
}
