import { Username } from '../Username';
import { UsernameTooShortError } from '@triumph-motorcycles/domain/errors/user/UsernameTooShortError';

describe('Username', () => {
  it('should create a valid Username instance', () => {
    const value = 'Validusername';
    const username = Username.from(value);
    expect(username).toBeInstanceOf(Username);
    if (username instanceof Username) {
      expect(username.value).toBe('validusername');
    }
  });

  it('should return an error for invalid username', () => {
    const value = 'in';
    const username = Username.from(value);
    expect(username).toBeInstanceOf(UsernameTooShortError);
  });

  it('should trim the value', () => {
    const value = '  validusername  ';
    const username = Username.from(value);
    expect(username).toBeInstanceOf(Username);
    if (username instanceof Username) {
      expect(username.value).toBe('validusername');
    }
  });

  it('should compare note value correctly', () => {
    const value = 'validusername';
    const username = Username.from(value);
    if (username instanceof Username) {
      expect(username.isValue('validusername')).toBe(true);
    }
  });
});
