import { SparePartOrderRecordQuantityOrdered } from '../SparePartOrderRecordQuantityOrdered';

describe('SparePartOrderRecordQuantityOrdered', () => {
  it('should create a valid SparePartOrderRecordQuantityOrdered instance', () => {
    const value = 10;
    const quantityOrdered = new SparePartOrderRecordQuantityOrdered(value);
    expect(quantityOrdered).toBeInstanceOf(SparePartOrderRecordQuantityOrdered);
    expect(quantityOrdered.value).toBe(value);
  });

  it('should compare quantity ordered value correctly', () => {
    const value = 10;
    const quantityOrdered = new SparePartOrderRecordQuantityOrdered(value);
    expect(quantityOrdered.isValue(value)).toBe(true);
    expect(quantityOrdered.isValue(20)).toBe(false);
  });

  it('should compare two SparePartOrderRecordQuantityOrdered instances correctly', () => {
    const value1 = 10;
    const value2 = 20;
    const quantityOrdered1 = new SparePartOrderRecordQuantityOrdered(value1);
    const quantityOrdered2 = new SparePartOrderRecordQuantityOrdered(value2);
    const quantityOrdered3 = new SparePartOrderRecordQuantityOrdered(value1);

    expect(quantityOrdered1.is(quantityOrdered2)).toBe(false);
    expect(quantityOrdered1.is(quantityOrdered3)).toBe(true);
  });
});
