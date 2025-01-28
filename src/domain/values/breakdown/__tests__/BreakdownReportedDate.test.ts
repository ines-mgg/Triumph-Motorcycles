import { BreakdownReportedDateError } from '@triumph-motorcycles/domain/errors/breakdown/BreakdownReportedDateError';
import { BreakdownReportedDate } from '../BreakdownReportedDate';
import { now, tomorrow } from '../../../../tests/testUtils';

describe('BreakdownReportedDate', () => {
  it('should create a valid BreakdownReportedDate', () => {
    const breakdownReportedDate = BreakdownReportedDate.from(now);
    expect(breakdownReportedDate).toBeInstanceOf(BreakdownReportedDate);
    if (breakdownReportedDate instanceof BreakdownReportedDate) {
      expect(breakdownReportedDate.value).toBe(now);
    }
  });
  it('should return an error for invalid BreakdownReportedDate', () => {
    const breakdownReportedDate = BreakdownReportedDate.from(tomorrow);
    expect(breakdownReportedDate).toBeInstanceOf(BreakdownReportedDateError);
  });
  it('should compare TimeRange value correctly', () => {
    const breakdownReportedDate = BreakdownReportedDate.from(now);
    if (breakdownReportedDate instanceof BreakdownReportedDate) {
      expect(breakdownReportedDate.isValue(now)).toBe(true);
      expect(breakdownReportedDate.value).toStrictEqual(now);
    }
  });
});
