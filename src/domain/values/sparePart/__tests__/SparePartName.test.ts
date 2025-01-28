import { SparePartName } from '../SparePartName';
import { SparePartNameError } from '@triumph-motorcycles/domain/errors/sparePart/SparePartNameError';

describe('SparePartName', () => {
  it('should create a valid SparePartName instance', () => {
    const value = 'Valid Spare Part Name';
    const sparePartName = SparePartName.from(value);
    expect(sparePartName).toBeInstanceOf(SparePartName);
    if (sparePartName instanceof SparePartName) {
      expect(sparePartName.value).toBe(value);
    }
  });

  it('should return an error for name exceeding max length', () => {
    const value = 'A'.repeat(51);
    const sparePartName = SparePartName.from(value);
    expect(sparePartName).toBeInstanceOf(SparePartNameError);
  });

  it('should compare spare part name value correctly', () => {
    const value = 'Valid Spare Part Name';
    const sparePartName = SparePartName.from(value);
    if (sparePartName instanceof SparePartName) {
      expect(sparePartName.isValue(value)).toBe(true);
      expect(sparePartName.isValue('Different Name')).toBe(false);
    }
  });

  it('should compare two SparePartName instances correctly', () => {
    const value1 = 'Valid Spare Part Name';
    const value2 = 'Another Spare Part Name';
    const sparePartName1 = SparePartName.from(value1);
    const sparePartName2 = SparePartName.from(value2);
    const sparePartName3 = SparePartName.from(value1);

    if (
      sparePartName1 instanceof SparePartName &&
      sparePartName2 instanceof SparePartName &&
      sparePartName3 instanceof SparePartName
    ) {
      expect(sparePartName1.is(sparePartName2)).toBe(false);
      expect(sparePartName1.is(sparePartName3)).toBe(true);
    }
  });
});
