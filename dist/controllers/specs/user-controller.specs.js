"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
// TODO(jannyHou): This should be moved to @loopback/authentication
exports.UserProfileSchema = {
    type: 'object',
    required: ['account'],
    properties: {
        account: { type: 'string' },
        name: { type: 'string' },
    },
};
// TODO(jannyHou): This is a workaround to manually
// describe the request body of 'Users/login'.
// We should either create a Credential model, or
// infer the spec from User model
const CredentialsSchema = {
    type: 'object',
    required: ['account', 'password'],
    properties: {
        account: { type: 'string' },
        password: {
            type: 'string',
            minLength: 6,
        },
    },
};
exports.CredentialsRequestBody = {
    description: 'The input of login function',
    required: true,
    content: {
        'application/json': { schema: CredentialsSchema },
    },
};
//# sourceMappingURL=user-controller.specs.js.map