"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/authentication
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@loopback/rest");
function validateCredentials(credentials) {
    // Validate Password Length
    if (credentials.password.length < 8) {
        throw new rest_1.HttpErrors.UnprocessableEntity('password must be minimum 8 characters');
    }
}
exports.validateCredentials = validateCredentials;
function validateDate(date) {
    let reg = /^[0-9]{2}(0?[1-9]|1[012])(0?[1-9]|[12][0-9]|3[01])$/;
    if (!reg.test(date)) {
        throw new rest_1.HttpErrors.BadRequest('Invalide Date, should be like: 190103');
    }
}
exports.validateDate = validateDate;
function validateBoolean(input, para) {
    let valid = (input == 1) || (input == 0);
    if (!valid) {
        throw new rest_1.HttpErrors.BadRequest(para + ': boolean value should be 1 or 0');
    }
}
exports.validateBoolean = validateBoolean;
//# sourceMappingURL=validator.js.map