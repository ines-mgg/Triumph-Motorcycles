import { SparePartOrderRecordCostPerUnit } from '../SparePartOrderRecordCostPerUnit';

describe('SparePartOrderRecordCostPerUnit', () => {
  it('should create a valid SparePartOrderRecordCostPerUnit instance', () => {
    const value = 100;
    const costPerUnit = new SparePartOrderRecordCostPerUnit(value);
    expect(costPerUnit).toBeInstanceOf(SparePartOrderRecordCostPerUnit);
    expect(costPerUnit.value).toBe(value);
  });

  it('should compare cost per unit value correctly', () => {
    const value = 100;
    const costPerUnit = new SparePartOrderRecordCostPerUnit(value);
    expect(costPerUnit.isValue(value)).toBe(true);
    expect(costPerUnit.isValue(200)).toBe(false);
  });

  it('should compare two SparePartOrderRecordCostPerUnit instances correctly', () => {
    const value1 = 100;
    const value2 = 200;
    const costPerUnit1 = new SparePartOrderRecordCostPerUnit(value1);
    const costPerUnit2 = new SparePartOrderRecordCostPerUnit(value2);
    const costPerUnit3 = new SparePartOrderRecordCostPerUnit(value1);

    expect(costPerUnit1.is(costPerUnit2)).toBe(false);
    expect(costPerUnit1.is(costPerUnit3)).toBe(true);
  });
});
