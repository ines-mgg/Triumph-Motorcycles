import { SparePartOrderRecordTotalCost } from '../SparePartOrderRecordTotalCost';

describe('SparePartOrderRecordTotalCost', () => {
  it('should create a valid SparePartOrderRecordTotalCost instance', () => {
    const value = 100;
    const totalCost = new SparePartOrderRecordTotalCost(value);
    expect(totalCost).toBeInstanceOf(SparePartOrderRecordTotalCost);
    expect(totalCost.value).toBe(value);
  });

  it('should compare total cost value correctly', () => {
    const value = 100;
    const totalCost = new SparePartOrderRecordTotalCost(value);
    expect(totalCost.isValue(value)).toBe(true);
    expect(totalCost.isValue(200)).toBe(false);
  });

  it('should compare two SparePartOrderRecordTotalCost instances correctly', () => {
    const value1 = 100;
    const value2 = 200;
    const totalCost1 = new SparePartOrderRecordTotalCost(value1);
    const totalCost2 = new SparePartOrderRecordTotalCost(value2);
    const totalCost3 = new SparePartOrderRecordTotalCost(value1);

    expect(totalCost1.is(totalCost2)).toBe(false);
    expect(totalCost1.is(totalCost3)).toBe(true);
  });
});
