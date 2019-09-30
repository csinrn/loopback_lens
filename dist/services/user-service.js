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
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/authentication
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
const rest_1 = require("@loopback/rest");
const admin_repository_1 = require("../repositories/admin.repository");
const repository_1 = require("@loopback/repository");
const keys_1 = require("../keys");
const context_1 = require("@loopback/context");
let MyUserService = class MyUserService {
    constructor(userRepository, passwordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }
    async verifyCredentials(credentials) {
        const invalidCredentialsError = '帳號或密碼錯誤';
        const foundUser = await this.userRepository.findOne({
            where: { account: credentials.account },
        });
        if (!foundUser) {
            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
        }
        const passwordMatched = await this.passwordHasher.comparePassword(credentials.password, foundUser.password);
        if (!passwordMatched) {
            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
        }
        return foundUser;
    }
    convertToUserProfile(admin) {
        return { id: admin.account, name: admin.name };
    }
};
MyUserService = __decorate([
    __param(0, repository_1.repository(admin_repository_1.AdminRepository)),
    __param(1, context_1.inject(keys_1.PasswordHasherBindings.PASSWORD_HASHER)),
    __metadata("design:paramtypes", [admin_repository_1.AdminRepository, Object])
], MyUserService);
exports.MyUserService = MyUserService;
//# sourceMappingURL=user-service.js.map