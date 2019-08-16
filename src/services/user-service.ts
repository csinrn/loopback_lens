// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/authentication
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
import { HttpErrors } from '@loopback/rest';
import { Credentials, AdminRepository } from '../repositories/admin.repository';
import { Admin } from '../models/admin.model';
import { UserService, UserProfile } from '@loopback/authentication';
import { repository } from '@loopback/repository';
import { PasswordHasher } from './hash.password.bcryptjs';
import { PasswordHasherBindings } from '../keys';
import { inject } from '@loopback/context';

export class MyUserService implements UserService<Admin, Credentials> {
  constructor(
    @repository(AdminRepository) public userRepository: AdminRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
  ) { }

  async verifyCredentials(credentials: Credentials): Promise<Admin> {
    const invalidCredentialsError = 'Invalid account or password.';

    const foundUser = await this.userRepository.findOne({
      where: { account: credentials.account },
    });

    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    const passwordMatched = await this.passwordHasher.comparePassword(
      credentials.password,
      foundUser.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }

  convertToUserProfile(admin: Admin): UserProfile {
    return { id: admin.account, name: admin.name };
  }
}
