import { SparePartOrderRecordDeliveredQuantity } from '../SparePartOrderRecordDeliveredQuantity';

describe('SparePartOrderRecordDeliveredQuantity', () => {
  it('should create a valid SparePartOrderRecordDeliveredQuantity instance', () => {
    const value = 10;
    const deliveredQuantity = new SparePartOrderRecordDeliveredQuantity(value);
    expect(deliveredQuantity).toBeInstanceOf(
      SparePartOrderRecordDeliveredQuantity,
    );
    expect(deliveredQuantity.value).toBe(value);
  });

  it('should compare delivered quantity value correctly', () => {
    const value = 10;
    const deliveredQuantity = new SparePartOrderRecordDeliveredQuantity(value);
    expect(deliveredQuantity.isValue(value)).toBe(true);
    expect(deliveredQuantity.isValue(20)).toBe(false);
  });

  it('should compare two SparePartOrderRecordDeliveredQuantity instances correctly', () => {
    const value1 = 10;
    const value2 = 20;
    const deliveredQuantity1 = new SparePartOrderRecordDeliveredQuantity(
      value1,
    );
    const deliveredQuantity2 = new SparePartOrderRecordDeliveredQuantity(
      value2,
    );
    const deliveredQuantity3 = new SparePartOrderRecordDeliveredQuantity(
      value1,
    );

    expect(deliveredQuantity1.is(deliveredQuantity2)).toBe(false);
    expect(deliveredQuantity1.is(deliveredQuantity3)).toBe(true);
  });
});
