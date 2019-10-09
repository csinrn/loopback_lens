// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/authentication
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Credentials } from '../repositories/admin.repository';
import { HttpErrors } from '@loopback/rest';

export function validateCredentials(credentials: Credentials) {
  // Validate Password Length
  if (credentials.password.length < 6) {
    throw new HttpErrors.UnprocessableEntity(
      '密碼最少需要6個字',
    );
  }
}

export function validate24hr(time: number, errMsg: string) {
  if (!(time >= 0 && time <= 24))
    throw new HttpErrors.BadRequest(errMsg)
  return 1;
}

export function validateDate(date: string) {
  let reg = /^[0-9]{2}(0?[1-9]|1[012])(0?[1-9]|[12][0-9]|3[01])$/;
  if (!reg.test(date)) {
    throw new HttpErrors.BadRequest(
      'Invalide Date, should be like: 190103'
    )
  }
}

export function validateBoolean(input: number, para: string) {
  let valid = (input == 1) || (input == 0);
  if (!valid) {
    throw new HttpErrors.BadRequest(
      para + ': 應輸入數字 1 或 0'
    )
  }
}
