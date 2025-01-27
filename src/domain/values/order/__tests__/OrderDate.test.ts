import { OrderDate } from '../OrderDate';
import { OrderDateError } from '@triumph-motorcycles/domain/errors';
import { now } from '../../../../tests/testUtils';

describe('OrderDate', () => {
  it('should create a valid OrderDate instance', () => {
    const orderDate = OrderDate.from(now);
    expect(orderDate).toBeInstanceOf(OrderDate);
    if (orderDate instanceof OrderDate) {
      expect(orderDate.value).toBe(now);
    }
  });

  it('should return an error for invalid orderDate', () => {
    const orderDate = OrderDate.from(new Date('2024-01-01'));
    expect(orderDate).toBeInstanceOf(OrderDateError);
  });

  it('should compare note value correctly', () => {
    const orderDate = OrderDate.from(now);
    if (orderDate instanceof OrderDate) {
      expect(orderDate.isValue(now)).toBe(true);
    }
  });
});
