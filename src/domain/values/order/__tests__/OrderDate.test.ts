import { OrderDate } from '../OrderDate';
import { OrderDateError } from '@triumph-motorcycles/domain/errors/order/OrderDateError';

describe('OrderDate', () => {
  it('should create a valid OrderDate instance', () => {
    const date = new Date();
    const orderDate = OrderDate.from(date);
    expect(orderDate).toBeInstanceOf(OrderDate);
    if (orderDate instanceof OrderDate) {
      expect(orderDate.value).toBe(date);
    }
  });

  it('should return an error for invalid orderDate', () => {
    const orderDate = OrderDate.from(new Date('2024-01-01'));
    expect(orderDate).toBeInstanceOf(OrderDateError);
  });

  it('should compare note value correctly', () => {
    const date = new Date();
    const orderDate = OrderDate.from(date);
    if (orderDate instanceof OrderDate) {
      expect(orderDate.isValue(date)).toBe(true);
    }
  });
});
