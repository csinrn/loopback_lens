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

  @post('/admins', {
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
    validateDate(admin.creatat);
    // encrypt the password
    admin.password = await this.passwordHasher.hashPassword(admin.password);

    // create the new user
    const savedAdmin = await this.adminRepository.create(admin);
    delete savedAdmin.password;

    return savedAdmin;
  }

  @post('/admins/login', {
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
  ): Promise<{ token: string }> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);

    return { token };
  }

  @get('/admins/me', {
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: UserProfileSchema,
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async printCurrentUser(
    @inject(AuthenticationBindings.CURRENT_USER)
    currentUserProfile: UserProfile,
  ): Promise<UserProfile> {
    return currentUserProfile;
  }

  @get('/admins/count', {
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

  @get('/admins', {
    responses: {
      '200': {
        description: 'Array of Admin model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Admin) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Admin)) filter?: Filter<Admin>,
  ): Promise<Admin[]> {
    return await this.adminRepository.find(filter);
  }

  @patch('/admins', {
    responses: {
      '200': {
        description: 'Admin PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Admin, { partial: true }),
        },
      },
    })
    admin: Admin,
    @param.query.object('where', getWhereSchemaFor(Admin)) where?: Where<Admin>,
  ): Promise<Count> {
    return await this.adminRepository.updateAll(admin, where);
  }

  @get('/admins/{id}', {
    responses: {
      '200': {
        description: 'Admin model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Admin) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Admin> {
    return await this.adminRepository.findById(id);
  }

  @patch('/admins/{id}', {
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

  @put('/admins/{id}', {
    responses: {
      '204': {
        description: 'Admin PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() admin: Admin,
  ): Promise<void> {
    await this.adminRepository.replaceById(id, admin);
  }

  @del('/admins/{id}', {
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
