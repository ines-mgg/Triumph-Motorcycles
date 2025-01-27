import { WarrantyEndDate } from '../WarrantyEndDate';
import { WarrantyEndDateError } from '@triumph-motorcycles/domain/errors';

describe('WarrantyEndDate', () => {
  it('should create a valid WarrantyEndDate instance', () => {
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 30);
    const warrantyEndDate = WarrantyEndDate.from(endDate, startDate);
    expect(warrantyEndDate).toBeInstanceOf(WarrantyEndDate);
    if (warrantyEndDate instanceof WarrantyEndDate) {
      expect(warrantyEndDate.value).toStrictEqual(endDate);
    }
  });

  it('should return an error for a past end date', () => {
    const startDate = new Date();
    const pastDate = new Date(startDate);
    pastDate.setDate(startDate.getDate() - 1);
    const warrantyEndDate = WarrantyEndDate.from(pastDate, startDate);
    expect(warrantyEndDate).toBeInstanceOf(WarrantyEndDateError);
  });

  it('should return an error for an end date more than a year from the start date', () => {
    const startDate = new Date();
    const futureDate = new Date(startDate);
    futureDate.setDate(startDate.getDate() + 366);
    const warrantyEndDate = WarrantyEndDate.from(futureDate, startDate);
    expect(warrantyEndDate).toBeInstanceOf(WarrantyEndDateError);
  });

  it('should compare warranty end date value correctly', () => {
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 30);
    const warrantyEndDate = WarrantyEndDate.from(endDate, startDate);
    if (warrantyEndDate instanceof WarrantyEndDate) {
      expect(warrantyEndDate.isValue(endDate)).toBe(true);
      expect(warrantyEndDate.isValue(new Date(endDate.getTime() + 1000))).toBe(
        false,
      );
    }
  });

  it('should compare two WarrantyEndDate instances correctly', () => {
    const startDate = new Date();
    const endDate1 = new Date(startDate);
    endDate1.setDate(startDate.getDate() + 30);
    const endDate2 = new Date(startDate);
    endDate2.setDate(startDate.getDate() + 60);
    const warrantyEndDate1 = WarrantyEndDate.from(endDate1, startDate);
    const warrantyEndDate2 = WarrantyEndDate.from(endDate2, startDate);
    const warrantyEndDate3 = WarrantyEndDate.from(endDate1, startDate);

    if (
      warrantyEndDate1 instanceof WarrantyEndDate &&
      warrantyEndDate2 instanceof WarrantyEndDate &&
      warrantyEndDate3 instanceof WarrantyEndDate
    ) {
      expect(warrantyEndDate1.is(warrantyEndDate2)).toBe(false);
      expect(warrantyEndDate1.is(warrantyEndDate3)).toBe(true);
    }
  });
});
