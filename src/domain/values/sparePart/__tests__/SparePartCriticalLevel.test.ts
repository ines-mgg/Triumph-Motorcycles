import { SparePartCriticalLevel } from '../SparePartCriticalLevel';
import { SparePartCriticalLevelError } from '@triumph-motorcycles/domain/errors/sparePart/SparePartCriticalLevelError';

describe('SparePartCriticalLevel', () => {
  it('should create a valid SparePartCriticalLevel instance', () => {
    const value = 20;
    const sparePartCriticalLevel = SparePartCriticalLevel.from(value);
    expect(sparePartCriticalLevel).toBeInstanceOf(SparePartCriticalLevel);
    if (sparePartCriticalLevel instanceof SparePartCriticalLevel) {
      expect(sparePartCriticalLevel.value).toBe(value);
    }
  });

  it('should return an error for negative critical level', () => {
    const value = -5;
    const sparePartCriticalLevel = SparePartCriticalLevel.from(value);
    expect(sparePartCriticalLevel).toBeInstanceOf(SparePartCriticalLevelError);
  });

  it('should return an error for critical level less than 10', () => {
    const value = 5;
    const sparePartCriticalLevel = SparePartCriticalLevel.from(value);
    expect(sparePartCriticalLevel).toBeInstanceOf(SparePartCriticalLevelError);
  });

  it('should compare spare part critical level value correctly', () => {
    const value = 20;
    const sparePartCriticalLevel = SparePartCriticalLevel.from(value);
    if (sparePartCriticalLevel instanceof SparePartCriticalLevel) {
      expect(sparePartCriticalLevel.isValue(value)).toBe(true);
      expect(sparePartCriticalLevel.isValue(30)).toBe(false);
    }
  });

  it('should compare two SparePartCriticalLevel instances correctly', () => {
    const value1 = 20;
    const value2 = 30;
    const sparePartCriticalLevel1 = SparePartCriticalLevel.from(value1);
    const sparePartCriticalLevel2 = SparePartCriticalLevel.from(value2);
    const sparePartCriticalLevel3 = SparePartCriticalLevel.from(value1);

    if (
      sparePartCriticalLevel1 instanceof SparePartCriticalLevel &&
      sparePartCriticalLevel2 instanceof SparePartCriticalLevel &&
      sparePartCriticalLevel3 instanceof SparePartCriticalLevel
    ) {
      expect(sparePartCriticalLevel1.is(sparePartCriticalLevel2)).toBe(false);
      expect(sparePartCriticalLevel1.is(sparePartCriticalLevel3)).toBe(true);
    }
  });
});
