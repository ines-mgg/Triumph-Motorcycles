import { PasswordDoesNotIncludeSymbolError } from '@triumph-motorcycles/domain/errors/user/PasswordDoesNotIncludeSymbolError';
import { PasswordDoesNotIncludeUppercaseLetterError } from '@triumph-motorcycles/domain/errors/user/PasswordDoesNotIncludeUppercaseLetterError';
import { Password } from '../Password';

import bcrypt from 'bcrypt';

describe('Password', () => {
  it('should create a valid Password instance', () => {
    const value = 'Valid@123';
    const password = Password.from(value);
    expect(password).toBeInstanceOf(Password);
    if (password instanceof Password) {
      expect(bcrypt.compareSync(value, password.value)).toBe(true);
    }
  });

  it('should return an error if password does not include an uppercase letter', () => {
    const value = 'valid@123';
    const password = Password.from(value);
    expect(password).toBeInstanceOf(PasswordDoesNotIncludeUppercaseLetterError);
  });

  it('should return an error if password does not include a symbol', () => {
    const value = 'Valid123';
    const password = Password.from(value);
    expect(password).toBeInstanceOf(PasswordDoesNotIncludeSymbolError);
  });

  it('should compare plain password correctly', () => {
    const value = 'Valid@123';
    const password = Password.from(value);
    if (password instanceof Password) {
      expect(password.compare(value)).toBe(true);
      expect(password.compare('Invalid@123')).toBe(false);
    }
  });

  it('should compare hashed password value correctly', () => {
    const value = 'Valid@123';
    const password = Password.from(value);
    if (password instanceof Password) {
      expect(password.isValue(value)).toBe(true);
      expect(password.isValue('Invalid@123')).toBe(false);
    }
  });
});
