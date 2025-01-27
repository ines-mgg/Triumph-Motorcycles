import { SparePartCost } from '../SparePartCost';
import { SparePartCostError } from '@triumph-motorcycles/domain/errors';

describe('SparePartCost', () => {
  it('should create a valid SparePartCost instance', () => {
    const value = 100;
    const sparePartCost = SparePartCost.from(value);
    expect(sparePartCost).toBeInstanceOf(SparePartCost);
    if (sparePartCost instanceof SparePartCost) {
      expect(sparePartCost.value).toBe(value);
    }
  });

  it('should return an error for negative cost', () => {
    const value = -100;
    const sparePartCost = SparePartCost.from(value);
    expect(sparePartCost).toBeInstanceOf(SparePartCostError);
  });

  it('should compare spare part cost value correctly', () => {
    const value = 100;
    const sparePartCost = SparePartCost.from(value);
    if (sparePartCost instanceof SparePartCost) {
      expect(sparePartCost.isValue(value)).toBe(true);
      expect(sparePartCost.isValue(200)).toBe(false);
    }
  });

  it('should compare two SparePartCost instances correctly', () => {
    const value1 = 100;
    const value2 = 200;
    const sparePartCost1 = SparePartCost.from(value1);
    const sparePartCost2 = SparePartCost.from(value2);
    const sparePartCost3 = SparePartCost.from(value1);

    if (
      sparePartCost1 instanceof SparePartCost &&
      sparePartCost2 instanceof SparePartCost &&
      sparePartCost3 instanceof SparePartCost
    ) {
      expect(sparePartCost1.is(sparePartCost2)).toBe(false);
      expect(sparePartCost1.is(sparePartCost3)).toBe(true);
    }
  });
});
