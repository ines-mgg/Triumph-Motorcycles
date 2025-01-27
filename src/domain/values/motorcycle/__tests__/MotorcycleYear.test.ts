import { MotorcycleYear } from '../MotorcycleYear';
import { MotorcycleYearError } from '@triumph-motorcycles/domain/errors';

describe('MotorcycleYear', () => {
  it('should create a valid MotorcycleYear instance', () => {
    const value = 1901;
    const motorcycleStatus = MotorcycleYear.from(value);
    expect(motorcycleStatus).toBeInstanceOf(MotorcycleYear);
    if (motorcycleStatus instanceof MotorcycleYear) {
      expect(motorcycleStatus.value).toBe(value);
    }
  });

  it('should return an error for invalid motorcycleStatus', () => {
    const value = 1899;
    const motorcycleStatus = MotorcycleYear.from(value);
    expect(motorcycleStatus).toBeInstanceOf(MotorcycleYearError);
  });
});
