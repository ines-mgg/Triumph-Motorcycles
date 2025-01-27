import { WarrantyStartDate } from '../WarrantyStartDate';
import { WarrantyStartDateError } from '@triumph-motorcycles/domain/errors';

describe('WarrantyStartDate', () => {
  it('should create a valid WarrantyStartDate instance', () => {
    const value = new Date();
    const warrantyStartDate = WarrantyStartDate.from(value);
    expect(warrantyStartDate).toBeInstanceOf(WarrantyStartDate);
    if (warrantyStartDate instanceof WarrantyStartDate) {
      expect(warrantyStartDate.value).toStrictEqual(value);
    }
  });

  it('should return an error for a future start date', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const warrantyStartDate = WarrantyStartDate.from(futureDate);
    expect(warrantyStartDate).toBeInstanceOf(WarrantyStartDateError);
  });

  it('should compare warranty start date value correctly', () => {
    const value = new Date();
    const warrantyStartDate = WarrantyStartDate.from(value);
    if (warrantyStartDate instanceof WarrantyStartDate) {
      expect(warrantyStartDate.isValue(value)).toBe(true);
      expect(warrantyStartDate.isValue(new Date(value.getTime() + 1000))).toBe(
        false,
      );
    }
  });

  it('should compare two WarrantyStartDate instances correctly', () => {
    const value1 = new Date();
    const value2 = new Date(value1.getTime() + 1000);
    const warrantyStartDate1 = WarrantyStartDate.from(value1);
    const warrantyStartDate2 = WarrantyStartDate.from(value2);
    const warrantyStartDate3 = WarrantyStartDate.from(value1);

    if (
      warrantyStartDate1 instanceof WarrantyStartDate &&
      warrantyStartDate2 instanceof WarrantyStartDate &&
      warrantyStartDate3 instanceof WarrantyStartDate
    ) {
      expect(warrantyStartDate1.is(warrantyStartDate2)).toBe(false);
      expect(warrantyStartDate1.is(warrantyStartDate3)).toBe(true);
    }
  });
});
