import { BreakdownDescriptionError } from '@triumph-motorcycles/domain/errors/breakdown/BreakdownDescriptionError';
import { BreakdownDescription } from '../BreakdownDescription';

describe('BreakdownDescription', () => {
  it('should create a valid BreakdownDescription', () => {
    const value =
      'Lorem ipsum dolor sit amet. Et nobis velit est sint voluptatem qui accusamus itaque ut ullam quam. Qui quae cupiditate aut alias molestiae sit ipsa voluptatum in quisquam sint eum dolor nemo vel quasi atque?';
    const breakdownDescription = BreakdownDescription.from(value);
    expect(breakdownDescription).toBeInstanceOf(BreakdownDescription);
    if (breakdownDescription instanceof BreakdownDescription) {
      expect(breakdownDescription.value).toBe(value);
    }
  });
  it('should return an error for invalid BreakdownDescription', () => {
    const value = '';
    const breakdownDescription = BreakdownDescription.from(value);
    expect(breakdownDescription).toBeInstanceOf(BreakdownDescriptionError);
  });
  it('should compare TimeRange value correctly', () => {
    const value =
      'Lorem ipsum dolor sit amet. Et nobis velit est sint voluptatem qui accusamus itaque ut ullam quam. Qui quae cupiditate aut alias molestiae sit ipsa voluptatum in quisquam sint eum dolor nemo vel quasi atque?';
    const breakdownDescription = BreakdownDescription.from(value);
    if (breakdownDescription instanceof BreakdownDescription) {
      expect(breakdownDescription.isValue(value)).toBe(true);
      expect(breakdownDescription.value).toStrictEqual(value);
    }
  });
});
