import { DriverYearsOfExperience } from '../DriverYearsOfExperience';
import { ExperienceError } from '@triumph-motorcycles/domain/errors/drivers';

describe('DriverYearsOfExperience', () => {
  it('should create a valid DriverYearsOfExperience instance', () => {
    const value = 10;
    const driverEmail = DriverYearsOfExperience.from(value);
    expect(driverEmail).toBeInstanceOf(DriverYearsOfExperience);
    if (driverEmail instanceof DriverYearsOfExperience) {
      expect(driverEmail.value).toBe(value);
    }
  });

  it('should return an error for invalid driverEmail', () => {
    const value = 1;
    const driverEmail = DriverYearsOfExperience.from(value);
    expect(driverEmail).toBeInstanceOf(ExperienceError);
  });

  it('should compare email value correctly', () => {
    const value = 10;
    const driverEmail = DriverYearsOfExperience.from(value);
    if (driverEmail instanceof DriverYearsOfExperience) {
      expect(driverEmail.isValue(10)).toBe(true);
    }
  });
});
