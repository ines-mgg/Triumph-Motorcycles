import { MaintenanceIntervalMileage } from '../MaintenanceIntervalMileage';
import { BreakdownDescriptionError } from '@triumph-motorcycles/domain/errors/breakdown/BreakdownDescriptionError';

describe('MaintenanceIntervalMileage', () => {
  it('should create a valid MaintenanceIntervalMileage instance', () => {
    const value = 12;
    const notes = MaintenanceIntervalMileage.from(value);
    expect(notes).toBeInstanceOf(MaintenanceIntervalMileage);
    if (notes instanceof MaintenanceIntervalMileage) {
      expect(notes.value).toBe(value);
    }
  });

  it('should return an error for invalid notes', () => {
    const value = 0;
    const notes = MaintenanceIntervalMileage.from(value);
    expect(notes).toBeInstanceOf(BreakdownDescriptionError);
  });

  it('should compare note value correctly', () => {
    const value = 15;
    const notes = MaintenanceIntervalMileage.from(value);
    if (notes instanceof MaintenanceIntervalMileage) {
      expect(notes.isValue(15)).toBe(true);
    }
  });
});
