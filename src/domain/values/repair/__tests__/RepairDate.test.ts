import { RepairDate } from '../RepairDate';
import { RepairDateError } from '@triumph-motorcycles/domain/errors';
import { tomorrow } from '../../../../tests/testUtils';

describe('RepairDate', () => {
  it('should create a valid RepairDate instance', () => {
    const repairDate = RepairDate.from(tomorrow);
    expect(repairDate).toBeInstanceOf(RepairDate);
    if (repairDate instanceof RepairDate) {
      expect(repairDate.value).toBe(tomorrow);
    }
  });

  it('should return an error for invalid repairDate', () => {
    const repairDate = RepairDate.from(new Date('2024-01-01'));
    expect(repairDate).toBeInstanceOf(RepairDateError);
  });

  it('should compare note value correctly', () => {
    const repairDate = RepairDate.from(tomorrow);
    if (repairDate instanceof RepairDate) {
      expect(repairDate.isValue(tomorrow)).toBe(true);
    }
  });
});
