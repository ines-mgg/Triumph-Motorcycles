import { DriverLicense } from '../DriverLicense';
import { ExperienceError } from '@triumph-motorcycles/domain/errors';

describe('DriverLicense', () => {
  it('should create a valid DriverLicense instance', () => {
    const value = 'ABC1234567';
    const driverEmail = DriverLicense.from(value);
    expect(driverEmail).toBeInstanceOf(DriverLicense);
    if (driverEmail instanceof DriverLicense) {
      expect(driverEmail.value).toBe(value);
    }
  });

  it('should return an error for invalid driverEmail', () => {
    const value = 'abc1234567';
    const driverEmail = DriverLicense.from(value);
    expect(driverEmail).toBeInstanceOf(ExperienceError);
  });

  it('should compare email value correctly', () => {
    const value = 'ABC1234567';
    const driverEmail = DriverLicense.from(value);
    if (driverEmail instanceof DriverLicense) {
      expect(driverEmail.isValue('ABC1234567')).toBe(true);
    }
  });
});
