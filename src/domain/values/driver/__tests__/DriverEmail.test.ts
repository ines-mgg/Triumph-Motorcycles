import { DriverEmail } from '../DriverEmail';
import { DriverEmailError } from '@triumph-motorcycles/domain/errors/drivers';

describe('DriverEmail', () => {
  it('should create a valid DriverEmail instance', () => {
    const value = 'username@gmail.com';
    const driverEmail = DriverEmail.from(value);
    expect(driverEmail).toBeInstanceOf(DriverEmail);
    if (driverEmail instanceof DriverEmail) {
      expect(driverEmail.value).toBe(value);
    }
  });

  it('should return an error for invalid driverEmail', () => {
    const value = 'Invalid email!';
    const driverEmail = DriverEmail.from(value);
    expect(driverEmail).toBeInstanceOf(DriverEmailError);
  });

  it('should compare email value correctly', () => {
    const value = 'username@gmail.com';
    const driverEmail = DriverEmail.from(value);
    if (driverEmail instanceof DriverEmail) {
      expect(driverEmail.isValue('username@gmail.com')).toBe(true);
    }
  });
});
