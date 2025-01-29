import { MotorcycleBrand } from '../MotorcycleBrand';
import { MotorcycleBrandError } from '@triumph-motorcycles/domain/errors/motorcycle/MotorcycleBrandError';

describe('MotorcycleBrand', () => {
  it('should create a valid MotorcycleBrand instance', () => {
    const value = 'ValidName';
    const motorcycleBrand = MotorcycleBrand.from(value);
    expect(motorcycleBrand).toBeInstanceOf(MotorcycleBrand);
    if (motorcycleBrand instanceof MotorcycleBrand) {
      expect(motorcycleBrand.value).toBe(value);
    }
  });

  it('should return an error for invalid motorcycleBrand (too short)', () => {
    const value = 'n';
    const motorcycleBrand = MotorcycleBrand.from(value);
    expect(motorcycleBrand).toBeInstanceOf(MotorcycleBrandError);
  });
  it('should return an error for invalid motorcycleBrand (empty)', () => {
    const value = '';
    const motorcycleBrand = MotorcycleBrand.from(value);
    expect(motorcycleBrand).toBeInstanceOf(MotorcycleBrandError);
  });
});
