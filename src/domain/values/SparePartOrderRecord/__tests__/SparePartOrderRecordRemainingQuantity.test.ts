import { SparePartOrderRecordRemainingQuantity } from '../SparePartOrderRecordRemainingQuantity';

describe('SparePartOrderRecordRemainingQuantity', () => {
  it('should create a valid SparePartOrderRecordRemainingQuantity instance', () => {
    const value = 10;
    const remainingQuantity = new SparePartOrderRecordRemainingQuantity(value);
    expect(remainingQuantity).toBeInstanceOf(
      SparePartOrderRecordRemainingQuantity,
    );
    expect(remainingQuantity.value).toBe(value);
  });

  it('should compare remaining quantity value correctly', () => {
    const value = 10;
    const remainingQuantity = new SparePartOrderRecordRemainingQuantity(value);
    expect(remainingQuantity.isValue(value)).toBe(true);
    expect(remainingQuantity.isValue(20)).toBe(false);
  });

  it('should compare two SparePartOrderRecordRemainingQuantity instances correctly', () => {
    const value1 = 10;
    const value2 = 20;
    const remainingQuantity1 = new SparePartOrderRecordRemainingQuantity(
      value1,
    );
    const remainingQuantity2 = new SparePartOrderRecordRemainingQuantity(
      value2,
    );
    const remainingQuantity3 = new SparePartOrderRecordRemainingQuantity(
      value1,
    );

    expect(remainingQuantity1.is(remainingQuantity2)).toBe(false);
    expect(remainingQuantity1.is(remainingQuantity3)).toBe(true);
  });
});
