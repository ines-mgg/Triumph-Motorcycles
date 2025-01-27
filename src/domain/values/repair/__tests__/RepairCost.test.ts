import { RepairCost } from '../RepairCost';
import { RepairCostError } from '@triumph-motorcycles/domain/errors';

describe('RepairCost', () => {
  it('should create a valid RepairCost instance', () => {
    const repairCost = RepairCost.from(200);
    expect(repairCost).toBeInstanceOf(RepairCost);
    if (repairCost instanceof RepairCost) {
      expect(repairCost.value).toBe(200);
    }
  });

  it('should return an error for invalid repairCost', () => {
    const repairCost = RepairCost.from(-1);
    expect(repairCost).toBeInstanceOf(RepairCostError);
  });

  it('should compare note value correctly', () => {
    const repairCost = RepairCost.from(200);
    if (repairCost instanceof RepairCost) {
      expect(repairCost.isValue(200)).toBe(true);
    }
  });
});
