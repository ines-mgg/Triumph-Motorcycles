import { MotorcycleStatus } from '../MotorcycleStatus';
import { MotorcycleStatusError } from '@triumph-motorcycles/domain/errors';

describe('MotorcycleStatus', () => {
  it('should create a valid MotorcycleStatus instance', () => {
    const value = 'Available';
    const motorcycleStatus = MotorcycleStatus.from(value);
    expect(motorcycleStatus).toBeInstanceOf(MotorcycleStatus);
    if (motorcycleStatus instanceof MotorcycleStatus) {
      expect(motorcycleStatus.value).toBe(value);
    }
  });

  it('should return an error for invalid motorcycleStatus', () => {
    const value = 'n';
    const motorcycleStatus = MotorcycleStatus.from(value);
    expect(motorcycleStatus).toBeInstanceOf(MotorcycleStatusError);
  });
});
