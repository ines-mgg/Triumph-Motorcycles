import { CommonRepairAction } from '@triumph-motorcycles/domain/types';
import { RepairEntity } from '../RepairEntity';
import { RepairCost, RepairDate } from '@triumph-motorcycles/domain/values';
import { breakdown } from '../../../../tests/testUtils';

describe('RepairEntity', () => {
  describe('create', () => {
    it('should successfully create a RepairEntity with valid inputs', () => {
      const validRepairDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
      const validActions: CommonRepairAction[] = [
        'Oil Change',
        'Brake Replacement',
      ];
      const validCost = 500;

      const repair = RepairEntity.create(
        breakdown,
        validRepairDate,
        validActions,
        validCost,
      );

      expect(repair).not.toBeInstanceOf(Error);
      if (!(repair instanceof Error)) {
        expect(repair.breakdown).toBe(breakdown);
        expect(repair.repairDate.value.getTime()).toBe(
          validRepairDate.getTime(),
        );
        expect(repair.actions).toEqual(validActions);
        expect(repair.cost.value).toBe(validCost);
      }
    });

    it('should return an error when the repair date is in the past', () => {
      const invalidRepairDate = new Date(Date.now() - 1000 * 60 * 60 * 24);
      const validActions: CommonRepairAction[] = ['Tire Replacement'];
      const validCost = 200;

      const repair = RepairEntity.create(
        breakdown,
        invalidRepairDate,
        validActions,
        validCost,
      );

      expect(repair).toBeInstanceOf(Error);
    });

    it('should return an error when the cost is negative', () => {
      const validRepairDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
      const validActions: CommonRepairAction[] = ['Battery Replacement'];
      const invalidCost = -100;

      const repair = RepairEntity.create(
        breakdown,
        validRepairDate,
        validActions,
        invalidCost,
      );

      expect(repair).toBeInstanceOf(Error);
    });
  });
});

describe('RepairDate', () => {
  it('should create a valid RepairDate for a future date', () => {
    const validDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const repairDate = RepairDate.from(validDate);

    expect(repairDate).not.toBeInstanceOf(Error);
    if (!(repairDate instanceof Error)) {
      expect(repairDate.value.getTime()).toBe(validDate.getTime());
    }
  });

  it('should return an error for a past date', () => {
    const invalidDate = new Date(Date.now() - 1000 * 60 * 60 * 24);
    const repairDate = RepairDate.from(invalidDate);

    expect(repairDate).toBeInstanceOf(Error);
  });
});

describe('RepairCost', () => {
  it('should create a valid RepairCost for a positive value', () => {
    const validCost = 300;
    const repairCost = RepairCost.from(validCost);

    expect(repairCost).not.toBeInstanceOf(Error);
    if (!(repairCost instanceof Error)) {
      expect(repairCost.value).toBe(validCost);
    }
  });

  it('should return an error for a negative cost', () => {
    const invalidCost = -100;
    const repairCost = RepairCost.from(invalidCost);

    expect(repairCost).toBeInstanceOf(Error);
  });
});
