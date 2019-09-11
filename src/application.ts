import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication, RestBindings } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import * as path from 'path';
import { MyAuthenticationSequence } from './sequence';
import { JWTAuthenticationStrategy } from './authentication-strategies/jwt-strategy';
import { PasswordHasherBindings } from './keys';
import { JWTService } from './services/jwt-service';
import { MyUserService } from './services/user-service';
import { BcryptHasher } from './services/hash.password.bcryptjs';

import {
  AuthenticationComponent,
  registerAuthenticationStrategy,
} from '@loopback/authentication';
import {
  TokenServiceBindings,
  UserServiceBindings,
  TokenServiceConstants,
} from './keys';
export class LensApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MyAuthenticationSequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));
    registerAuthenticationStrategy(this, JWTAuthenticationStrategy);


    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(
      TokenServiceConstants.TOKEN_SECRET_VALUE,
    );

    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
      TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE,
    );

    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);
    // Bind bcrypt hash services - utilized by 'UserController' and 'MyUserService'
    this.bind(PasswordHasherBindings.ROUNDS).to(10);
    this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher);

    this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);
    this.component(RestExplorerComponent);
    this.component(AuthenticationComponent);

    this.restServer.bind(RestBindings.REQUEST_BODY_PARSER_OPTIONS).to({
      limit: '6MB',
    });

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
