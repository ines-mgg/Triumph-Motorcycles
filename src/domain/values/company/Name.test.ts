import { Name } from './Name';
import { NameLengthError } from '@triumph-motorcycles/domain/errors/company/NameLengthError';
import { NameAlphanumericError } from '@triumph-motorcycles/domain/errors/company/NameAlphanumericError';

describe('Name', () => {
  it('should create a valid Name instance', () => {
    const value = 'ValidName';
    const name = Name.from(value);
    expect(name).toBeInstanceOf(Name);
    if (name instanceof Name) {
      expect(name.value).toBe(value);
    }
  });

  it('should return an error for invalid name (too short)', () => {
    const value = 'no';
    const name = Name.from(value);
    expect(name).toBeInstanceOf(NameLengthError);
  });
  it('should return an error for invalid name (symbol)', () => {
    const value = 'ValidName!';
    const name = Name.from(value);
    expect(name).toBeInstanceOf(NameAlphanumericError);
  });
});
