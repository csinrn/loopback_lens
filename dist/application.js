"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boot_1 = require("@loopback/boot");
const rest_explorer_1 = require("@loopback/rest-explorer");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const service_proxy_1 = require("@loopback/service-proxy");
const path = require("path");
const sequence_1 = require("./sequence");
const jwt_strategy_1 = require("./authentication-strategies/jwt-strategy");
const keys_1 = require("./keys");
const jwt_service_1 = require("./services/jwt-service");
const user_service_1 = require("./services/user-service");
const hash_password_bcryptjs_1 = require("./services/hash.password.bcryptjs");
const authentication_1 = require("@loopback/authentication");
const keys_2 = require("./keys");
class LensApplication extends boot_1.BootMixin(service_proxy_1.ServiceMixin(repository_1.RepositoryMixin(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        // Set up the custom sequence
        this.sequence(sequence_1.MyAuthenticationSequence);
        // Set up default home page
        this.static('/', path.join(__dirname, '../public'));
        authentication_1.registerAuthenticationStrategy(this, jwt_strategy_1.JWTAuthenticationStrategy);
        // Customize @loopback/rest-explorer configuration here
        this.bind(rest_explorer_1.RestExplorerBindings.CONFIG).to({
            path: '/explorer',
        });
        this.bind(keys_2.TokenServiceBindings.TOKEN_SECRET).to(keys_2.TokenServiceConstants.TOKEN_SECRET_VALUE);
        this.bind(keys_2.TokenServiceBindings.TOKEN_EXPIRES_IN).to(keys_2.TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE);
        this.bind(keys_2.TokenServiceBindings.TOKEN_SERVICE).toClass(jwt_service_1.JWTService);
        // Bind bcrypt hash services - utilized by 'UserController' and 'MyUserService'
        this.bind(keys_1.PasswordHasherBindings.ROUNDS).to(10);
        this.bind(keys_1.PasswordHasherBindings.PASSWORD_HASHER).toClass(hash_password_bcryptjs_1.BcryptHasher);
        this.bind(keys_2.UserServiceBindings.USER_SERVICE).toClass(user_service_1.MyUserService);
        this.component(rest_explorer_1.RestExplorerComponent);
        this.component(authentication_1.AuthenticationComponent);
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
exports.LensApplication = LensApplication;
//# sourceMappingURL=application.js.map