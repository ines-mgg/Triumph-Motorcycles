import { OrderItemQuantityOrdered } from '../OrderItemQuantityOrdered';
import { OrderItemQuantityOrderedError } from '@triumph-motorcycles/domain/errors';

describe('OrderItemQuantityOrdered', () => {
  it('should create a valid OrderItemQuantityOrdered instance', () => {
    const value = 10;
    const quantityOrdered = OrderItemQuantityOrdered.from(value);
    expect(quantityOrdered).toBeInstanceOf(OrderItemQuantityOrdered);
    if (quantityOrdered instanceof OrderItemQuantityOrdered) {
      expect(quantityOrdered.value).toBe(value);
    }
  });

  it('should return an error for zero or negative quantity ordered', () => {
    expect(OrderItemQuantityOrdered.from(0)).toBeInstanceOf(
      OrderItemQuantityOrderedError,
    );
    expect(OrderItemQuantityOrdered.from(-5)).toBeInstanceOf(
      OrderItemQuantityOrderedError,
    );
  });

  it('should compare quantity ordered value correctly', () => {
    const value = 10;
    const quantityOrdered = OrderItemQuantityOrdered.from(value);
    if (quantityOrdered instanceof OrderItemQuantityOrdered) {
      expect(quantityOrdered.isValue(value)).toBe(true);
      expect(quantityOrdered.isValue(20)).toBe(false);
    }
  });

  it('should compare two OrderItemQuantityOrdered instances correctly', () => {
    const value1 = 10;
    const value2 = 20;
    const quantityOrdered1 = OrderItemQuantityOrdered.from(value1);
    const quantityOrdered2 = OrderItemQuantityOrdered.from(value2);
    const quantityOrdered3 = OrderItemQuantityOrdered.from(value1);

    if (
      quantityOrdered1 instanceof OrderItemQuantityOrdered &&
      quantityOrdered2 instanceof OrderItemQuantityOrdered &&
      quantityOrdered3 instanceof OrderItemQuantityOrdered
    ) {
      expect(quantityOrdered1.is(quantityOrdered2)).toBe(false);
      expect(quantityOrdered1.is(quantityOrdered3)).toBe(true);
    }
  });
});
