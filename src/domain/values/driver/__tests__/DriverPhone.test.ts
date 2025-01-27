import { DriverPhone } from '../DriverPhone';
import { DriverPhoneError } from '@triumph-motorcycles/domain/errors';

describe('DriverPhone', () => {
  it('should create a valid DriverPhone instance', () => {
    const value = '0000000000';
    const driverEmail = DriverPhone.from(value);
    expect(driverEmail).toBeInstanceOf(DriverPhone);
    if (driverEmail instanceof DriverPhone) {
      expect(driverEmail.value).toBe(value);
    }
  });

  it('should return an error for invalid driverEmail', () => {
    const value = 'Invalid email!';
    const driverEmail = DriverPhone.from(value);
    expect(driverEmail).toBeInstanceOf(DriverPhoneError);
  });

  it('should compare email value correctly', () => {
    const value = '0000000000';
    const driverEmail = DriverPhone.from(value);
    if (driverEmail instanceof DriverPhone) {
      expect(driverEmail.isValue('0000000000')).toBe(true);
    }
  });
});
