import { MaintenanceIntervalTime } from '../MaintenanceIntervalTime';
import { MaintenanceIntervalTimeError } from '@triumph-motorcycles/domain/errors/maintenance/MaintenanceIntervalTime';

describe('MaintenanceIntervalTime', () => {
  it('should create a valid MaintenanceIntervalTime instance', () => {
    const value = 12;
    const notes = MaintenanceIntervalTime.from(value);
    expect(notes).toBeInstanceOf(MaintenanceIntervalTime);
    if (notes instanceof MaintenanceIntervalTime) {
      expect(notes.value).toBe(value);
    }
  });

  it('should return an error for invalid notes', () => {
    const value = 0;
    const notes = MaintenanceIntervalTime.from(value);
    expect(notes).toBeInstanceOf(MaintenanceIntervalTimeError);
  });

  it('should compare note value correctly', () => {
    const value = 15;
    const notes = MaintenanceIntervalTime.from(value);
    if (notes instanceof MaintenanceIntervalTime) {
      expect(notes.isValue(15)).toBe(true);
    }
  });
});
