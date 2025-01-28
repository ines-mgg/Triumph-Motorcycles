import { MotorcycleModel } from '../MotorcycleModel';
import { MotorcycleModelError } from '@triumph-motorcycles/domain/errors/motorcycle/MotorcycleModelError';

describe('MotorcycleModel', () => {
  it('should create a valid MotorcycleModel instance', () => {
    const value = 'ValidName';
    const motorcycleModel = MotorcycleModel.from(value);
    expect(motorcycleModel).toBeInstanceOf(MotorcycleModel);
    if (motorcycleModel instanceof MotorcycleModel) {
      expect(motorcycleModel.value).toBe(value);
    }
  });

  it('should return an error for invalid motorcycleModel (too short)', () => {
    const value = 'n';
    const motorcycleModel = MotorcycleModel.from(value);
    expect(motorcycleModel).toBeInstanceOf(MotorcycleModelError);
  });
  it('should return an error for invalid motorcycleModel (empty)', () => {
    const value = '';
    const motorcycleModel = MotorcycleModel.from(value);
    expect(motorcycleModel).toBeInstanceOf(MotorcycleModelError);
  });
});
