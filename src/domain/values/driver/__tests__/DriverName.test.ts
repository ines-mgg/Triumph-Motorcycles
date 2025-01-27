import { DriverName } from '../DriverName';
import { DriverNameError } from '@triumph-motorcycles/domain/errors';

describe('DriverName', () => {
  it('should create a valid DriverName instance', () => {
    const value = 'ValidName';
    const driverName = DriverName.from(value);
    expect(driverName).toBeInstanceOf(DriverName);
    if (driverName instanceof DriverName) {
      expect(driverName.value).toBe(value);
    }
  });
  it('should return an error for invalid driverName (too short)', () => {
    const value = 'no';
    const driverName = DriverName.from(value);
    expect(driverName).toBeInstanceOf(DriverNameError);
  });
  it('should return an error for invalid driverName (symbol)', () => {
    const value = 'ValidName!';
    const driverName = DriverName.from(value);
    expect(driverName).toBeInstanceOf(DriverNameError);
  });
  it('should compare driverName value correctly', () => {
    const value = 'ValidName';
    const driverName = DriverName.from(value);
    if (driverName instanceof DriverName) {
      expect(driverName.isValue('ValidName')).toBe(true);
    }
  });
});
