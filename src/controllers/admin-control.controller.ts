import { repository } from '@loopback/repository';
import { validateCredentials, validateDate } from '../services/validator';
import { Admin } from '../models';
import { AdminRepository } from '../repositories';
import { inject } from '@loopback/core';
import {
  authenticate,
  UserProfile,
  AuthenticationBindings,
  TokenService,
  UserService,
} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  Where,
} from '@loopback/repository';
import {
  CredentialsRequestBody,
  UserProfileSchema,
} from './specs/user-controller.specs';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Credentials } from '../repositories/admin.repository';
import { PasswordHasher } from '../services/hash.password.bcryptjs';

import {
  TokenServiceBindings,
  PasswordHasherBindings,
  UserServiceBindings,
  TokenServiceConstants,
} from '../keys';
import * as _ from 'lodash';



export class AdminControlController {
  constructor(
    @repository(AdminRepository)
    public adminRepository: AdminRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<Admin, Credentials>,
  ) { }

  @post('/admin/register', {
    responses: {
      '200': {
        description: 'Admin model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Admin) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Admin),
        },
      },
    })
    admin: Admin
  ): Promise<Admin> {
    // ensure a valid account value and password value
    validateCredentials(_.pick(admin, ['account', 'password']));
    validateDate(admin.createAt);
    // encrypt the password
    admin.password = await this.passwordHasher.hashPassword(admin.password);

    // create the new user
    const savedAdmin = await this.adminRepository.create(admin);
    delete savedAdmin.password;

    return savedAdmin;
  }

  @post('/admin/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{ userProfile: UserProfile }> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    //const token = await this.jwtService.generateToken(userProfile);
    //const expireinMs = TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE
    //return { token, expireinMs, userProfile };
    return { userProfile };
  }

  //@authenticate('jwt')
  @get('/admin/logout')
  async logout() {
    return { responses: { description: 'log out successfully' } }
  }

  @authenticate('jwt')
  @get('/admin/count', {
    responses: {
      '200': {
        description: 'Admin model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Admin)) where?: Where<Admin>,
  ): Promise<Count> {
    return await this.adminRepository.count(where);
  }

  @authenticate('jwt')
  @patch('/admin/{id}', {
    responses: {
      '204': {
        description: 'Admin PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Admin, { partial: true }),
        },
      },
    })
    admin: Admin,
  ): Promise<void> {
    await this.adminRepository.updateById(id, admin);
  }

  @authenticate('jwt')
  @del('/admin/{id}', {
    responses: {
      '204': {
        description: 'Admin DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.adminRepository.deleteById(id);
  }
}
