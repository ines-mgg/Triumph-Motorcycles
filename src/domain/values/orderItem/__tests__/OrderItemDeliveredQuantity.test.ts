import { OrderItemDeliveredQuantity } from '../OrderItemDeliveredQuantity';
import { OrderItemQuantityOrdered } from '../OrderItemQuantityOrdered';
import { OrderItemQuantityExceedError } from '@triumph-motorcycles/domain/errors';

describe('OrderItemDeliveredQuantity', () => {
  it('should create a valid OrderItemDeliveredQuantity instance', () => {
    const quantityOrdered = OrderItemQuantityOrdered.from(10);
    if (quantityOrdered instanceof OrderItemQuantityOrdered) {
      const deliveredQuantity = OrderItemDeliveredQuantity.from(
        5,
        quantityOrdered,
      );
      expect(deliveredQuantity).toBeInstanceOf(OrderItemDeliveredQuantity);
      if (deliveredQuantity instanceof OrderItemDeliveredQuantity) {
        expect(deliveredQuantity.value).toBe(5);
      }
    }
  });

  it('should return an error for negative delivered quantity', () => {
    const quantityOrdered = OrderItemQuantityOrdered.from(10);
    if (quantityOrdered instanceof OrderItemQuantityOrdered) {
      const deliveredQuantity = OrderItemDeliveredQuantity.from(
        -1,
        quantityOrdered,
      );
      expect(deliveredQuantity).toBeInstanceOf(Error);
    }
  });

  it('should return an error for delivered quantity exceeding ordered quantity', () => {
    const quantityOrdered = OrderItemQuantityOrdered.from(10);
    if (quantityOrdered instanceof OrderItemQuantityOrdered) {
      const deliveredQuantity = OrderItemDeliveredQuantity.from(
        15,
        quantityOrdered,
      );
      expect(deliveredQuantity).toBeInstanceOf(OrderItemQuantityExceedError);
    }
  });

  it('should compare delivered quantity value correctly', () => {
    const quantityOrdered = OrderItemQuantityOrdered.from(10);
    if (quantityOrdered instanceof OrderItemQuantityOrdered) {
      const deliveredQuantity = OrderItemDeliveredQuantity.from(
        5,
        quantityOrdered,
      );
      if (deliveredQuantity instanceof OrderItemDeliveredQuantity) {
        expect(deliveredQuantity.value).toBe(5);
        expect(deliveredQuantity.value).not.toBe(10);
      }
    }
  });

  it('should compare two OrderItemDeliveredQuantity instances correctly', () => {
    const quantityOrdered = OrderItemQuantityOrdered.from(10);
    if (quantityOrdered instanceof OrderItemQuantityOrdered) {
      const deliveredQuantity1 = OrderItemDeliveredQuantity.from(
        5,
        quantityOrdered,
      );
      const deliveredQuantity2 = OrderItemDeliveredQuantity.from(
        10,
        quantityOrdered,
      );
      const deliveredQuantity3 = OrderItemDeliveredQuantity.from(
        5,
        quantityOrdered,
      );

      if (
        deliveredQuantity1 instanceof OrderItemDeliveredQuantity &&
        deliveredQuantity2 instanceof OrderItemDeliveredQuantity &&
        deliveredQuantity3 instanceof OrderItemDeliveredQuantity
      ) {
        expect(deliveredQuantity1.value).toBe(deliveredQuantity3.value);
        expect(deliveredQuantity1.value).not.toBe(deliveredQuantity2.value);
      }
    }
  });
});
