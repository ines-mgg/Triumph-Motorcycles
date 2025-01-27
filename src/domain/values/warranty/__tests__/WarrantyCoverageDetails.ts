import { WarrantyCoverageDetails } from '../WarrantyCoverageDetails';
import { WarrantyCoverageDetailsError } from '@triumph-motorcycles/domain/errors';

describe('WarrantyCoverageDetails', () => {
  it('should create a valid WarrantyCoverageDetails instance', () => {
    const value = 'Valid warranty coverage details';
    const warrantyCoverageDetails = WarrantyCoverageDetails.from(value);
    expect(warrantyCoverageDetails).toBeInstanceOf(WarrantyCoverageDetails);
    if (warrantyCoverageDetails instanceof WarrantyCoverageDetails) {
      expect(warrantyCoverageDetails.value).toBe(value);
    }
  });

  it('should return an error for invalid characters in details', () => {
    const value = 'Invalid@Details!';
    const warrantyCoverageDetails = WarrantyCoverageDetails.from(value);
    expect(warrantyCoverageDetails).toBeInstanceOf(
      WarrantyCoverageDetailsError,
    );
  });

  it('should return an error for details exceeding max length', () => {
    const value = 'A'.repeat(1001);
    const warrantyCoverageDetails = WarrantyCoverageDetails.from(value);
    expect(warrantyCoverageDetails).toBeInstanceOf(
      WarrantyCoverageDetailsError,
    );
  });

  it('should compare warranty coverage details value correctly', () => {
    const value = 'Valid warranty coverage details';
    const warrantyCoverageDetails = WarrantyCoverageDetails.from(value);
    if (warrantyCoverageDetails instanceof WarrantyCoverageDetails) {
      expect(warrantyCoverageDetails.isValue(value)).toBe(true);
      expect(warrantyCoverageDetails.isValue('Different details')).toBe(false);
    }
  });

  it('should compare two WarrantyCoverageDetails instances correctly', () => {
    const value1 = 'Valid warranty coverage details';
    const value2 = 'Another warranty coverage details';
    const warrantyCoverageDetails1 = WarrantyCoverageDetails.from(value1);
    const warrantyCoverageDetails2 = WarrantyCoverageDetails.from(value2);
    const warrantyCoverageDetails3 = WarrantyCoverageDetails.from(value1);

    if (
      warrantyCoverageDetails1 instanceof WarrantyCoverageDetails &&
      warrantyCoverageDetails2 instanceof WarrantyCoverageDetails &&
      warrantyCoverageDetails3 instanceof WarrantyCoverageDetails
    ) {
      expect(warrantyCoverageDetails1.is(warrantyCoverageDetails2)).toBe(false);
      expect(warrantyCoverageDetails1.is(warrantyCoverageDetails3)).toBe(true);
    }
  });
});
