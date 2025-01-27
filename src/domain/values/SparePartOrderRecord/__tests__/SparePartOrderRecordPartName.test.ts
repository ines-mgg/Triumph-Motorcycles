import { SparePartOrderRecordPartName } from '../SparePartOrderRecordPartName';

describe('SparePartOrderRecordPartName', () => {
  it('should create a valid SparePartOrderRecordPartName instance', () => {
    const value = 'Valid Part Name';
    const partName = new SparePartOrderRecordPartName(value);
    expect(partName).toBeInstanceOf(SparePartOrderRecordPartName);
    expect(partName.value).toBe(value);
  });

  it('should throw an error for part name with invalid characters', () => {
    const value = 'Invalid@Name!';
    expect(() => new SparePartOrderRecordPartName(value)).toThrowError(
      'Le nom de la pièce ne peut contenir que des lettres, des chiffres et des espaces.',
    );
  });

  it('should compare part name value correctly', () => {
    const value = 'Valid Part Name';
    const partName = new SparePartOrderRecordPartName(value);
    expect(partName.isValue(value)).toBe(true);
    expect(partName.isValue('Different Part Name')).toBe(false);
  });

  it('should compare two SparePartOrderRecordPartName instances correctly', () => {
    const value1 = 'Valid Part Name';
    const value2 = 'Another Part Name';
    const partName1 = new SparePartOrderRecordPartName(value1);
    const partName2 = new SparePartOrderRecordPartName(value2);
    const partName3 = new SparePartOrderRecordPartName(value1);

    expect(partName1.is(partName2)).toBe(false);
    expect(partName1.is(partName3)).toBe(true);
  });
});
