"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const validator_1 = require("../services/validator");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const core_1 = require("@loopback/core");
const authentication_1 = require("@loopback/authentication");
const repository_2 = require("@loopback/repository");
const user_controller_specs_1 = require("./specs/user-controller.specs");
const rest_1 = require("@loopback/rest");
const keys_1 = require("../keys");
const _ = require("lodash");
let AdminControlController = class AdminControlController {
    constructor(adminRepository, passwordHasher, jwtService, userService) {
        this.adminRepository = adminRepository;
        this.passwordHasher = passwordHasher;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async create(admin) {
        // ensure a valid account value and password value
        validator_1.validateCredentials(_.pick(admin, ['account', 'password']));
        validator_1.validateDate(admin.creatat);
        // encrypt the password
        admin.password = await this.passwordHasher.hashPassword(admin.password);
        // create the new user
        const savedAdmin = await this.adminRepository.create(admin);
        delete savedAdmin.password;
        return savedAdmin;
    }
    async login(credentials) {
        // ensure the user exists, and the password is correct
        const user = await this.userService.verifyCredentials(credentials);
        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile = this.userService.convertToUserProfile(user);
        // create a JSON Web Token based on the user profile
        const token = await this.jwtService.generateToken(userProfile);
        return { token };
    }
    async printCurrentUser(currentUserProfile) {
        return currentUserProfile;
    }
    async count(where) {
        return await this.adminRepository.count(where);
    }
    async find(filter) {
        return await this.adminRepository.find(filter);
    }
    async updateAll(admin, where) {
        return await this.adminRepository.updateAll(admin, where);
    }
    async findById(id) {
        return await this.adminRepository.findById(id);
    }
    async updateById(id, admin) {
        await this.adminRepository.updateById(id, admin);
    }
    async replaceById(id, admin) {
        await this.adminRepository.replaceById(id, admin);
    }
    async deleteById(id) {
        await this.adminRepository.deleteById(id);
    }
};
__decorate([
    rest_1.post('/admins', {
        responses: {
            '200': {
                description: 'Admin model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Admin) } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Admin),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Admin]),
    __metadata("design:returntype", Promise)
], AdminControlController.prototype, "create", null);
__decorate([
    rest_1.post('/admins/login', {
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
    }),
    __param(0, rest_1.requestBody(user_controller_specs_1.CredentialsRequestBody)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminControlController.prototype, "login", null);
__decorate([
    rest_1.get('/admins/me', {
        responses: {
            '200': {
                description: 'The current user profile',
                content: {
                    'application/json': {
                        schema: user_controller_specs_1.UserProfileSchema,
                    },
                },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    __param(0, core_1.inject(authentication_1.AuthenticationBindings.CURRENT_USER)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminControlController.prototype, "printCurrentUser", null);
__decorate([
    rest_1.get('/admins/count', {
        responses: {
            '200': {
                description: 'Admin model count',
                content: { 'application/json': { schema: repository_2.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Admin))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminControlController.prototype, "count", null);
__decorate([
    rest_1.get('/admins', {
        responses: {
            '200': {
                description: 'Array of Admin model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.Admin) },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Admin))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminControlController.prototype, "find", null);
__decorate([
    rest_1.patch('/admins', {
        responses: {
            '200': {
                description: 'Admin PATCH success count',
                content: { 'application/json': { schema: repository_2.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Admin, { partial: true }),
            },
        },
    })),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Admin))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Admin, Object]),
    __metadata("design:returntype", Promise)
], AdminControlController.prototype, "updateAll", null);
__decorate([
    rest_1.get('/admins/{id}', {
        responses: {
            '200': {
                description: 'Admin model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Admin) } },
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminControlController.prototype, "findById", null);
__decorate([
    rest_1.patch('/admins/{id}', {
        responses: {
            '204': {
                description: 'Admin PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Admin, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.Admin]),
    __metadata("design:returntype", Promise)
], AdminControlController.prototype, "updateById", null);
__decorate([
    rest_1.put('/admins/{id}', {
        responses: {
            '204': {
                description: 'Admin PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.Admin]),
    __metadata("design:returntype", Promise)
], AdminControlController.prototype, "replaceById", null);
__decorate([
    rest_1.del('/admins/{id}', {
        responses: {
            '204': {
                description: 'Admin DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminControlController.prototype, "deleteById", null);
AdminControlController = __decorate([
    __param(0, repository_1.repository(repositories_1.AdminRepository)),
    __param(1, core_1.inject(keys_1.PasswordHasherBindings.PASSWORD_HASHER)),
    __param(2, core_1.inject(keys_1.TokenServiceBindings.TOKEN_SERVICE)),
    __param(3, core_1.inject(keys_1.UserServiceBindings.USER_SERVICE)),
    __metadata("design:paramtypes", [repositories_1.AdminRepository, Object, Object, Object])
], AdminControlController);
exports.AdminControlController = AdminControlController;
//# sourceMappingURL=admin-control.controller.js.map