import { InvalidTimeRangeError } from '@triumph-motorcycles/domain/errors/appointment/InvalidTimeRangeError';
import { TimeRange } from '../TimeRange';
import { now, tomorrow } from '../../../../tests/testUtils';

describe('TimeRange', () => {
  it('should create a valid TimeRange instance', () => {
    const timeRange = TimeRange.from(now, tomorrow);
    expect(timeRange).toBeInstanceOf(TimeRange);
    if (timeRange instanceof TimeRange) {
      expect(timeRange.value).toStrictEqual({
        startTime: now,
        endTime: tomorrow,
      });
    }
  });
  it('should return an error for invalid TimeRange', () => {
    const timeRange = TimeRange.from(now, now);
    expect(timeRange).toBeInstanceOf(InvalidTimeRangeError);
  });
  it('should compare TimeRange value correctly', () => {
    const timeRange = TimeRange.from(now, tomorrow);
    if (timeRange instanceof TimeRange) {
      expect(
        timeRange.isValue({
          startTime: now,
          endTime: tomorrow,
        }),
      ).toBe(true);
      expect(timeRange.value).toStrictEqual({
        startTime: now,
        endTime: tomorrow,
      });
    }
  });
});
