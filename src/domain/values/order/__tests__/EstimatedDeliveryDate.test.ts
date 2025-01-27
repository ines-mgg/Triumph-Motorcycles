import { EstimatedDeliveryDate } from '../EstimatedDeliveryDate';
import { EstimatedDeliveryDateError } from '@triumph-motorcycles/domain/errors';

describe('EstimatedDeliveryDate', () => {
  it('should create a valid EstimatedDeliveryDate instance', () => {
    const orderDate = new Date();
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(orderDate.getDate() + 30);
    const estimatedDeliveryDate = EstimatedDeliveryDate.from(
      deliveryDate,
      orderDate,
    );
    expect(estimatedDeliveryDate).toBeInstanceOf(EstimatedDeliveryDate);
    if (estimatedDeliveryDate instanceof EstimatedDeliveryDate) {
      expect(estimatedDeliveryDate.value).toStrictEqual(deliveryDate);
    }
  });

  it('should return an error for a past delivery date', () => {
    const orderDate = new Date();
    const pastDate = new Date(orderDate);
    pastDate.setDate(orderDate.getDate() - 1);
    const estimatedDeliveryDate = EstimatedDeliveryDate.from(
      pastDate,
      orderDate,
    );
    expect(estimatedDeliveryDate).toBeInstanceOf(EstimatedDeliveryDateError);
  });

  it('should return an error for a delivery date more than a year from the order date', () => {
    const orderDate = new Date();
    const futureDate = new Date(orderDate);
    futureDate.setDate(orderDate.getDate() + 366);
    const estimatedDeliveryDate = EstimatedDeliveryDate.from(
      futureDate,
      orderDate,
    );
    expect(estimatedDeliveryDate).toBeInstanceOf(EstimatedDeliveryDateError);
  });

  it('should compare delivery date value correctly', () => {
    const orderDate = new Date();
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(orderDate.getDate() + 30);
    const estimatedDeliveryDate = EstimatedDeliveryDate.from(
      deliveryDate,
      orderDate,
    );
    if (estimatedDeliveryDate instanceof EstimatedDeliveryDate) {
      expect(estimatedDeliveryDate.isValue(deliveryDate)).toBe(true);
      expect(
        estimatedDeliveryDate.isValue(new Date(deliveryDate.getTime() + 1000)),
      ).toBe(false);
    }
  });
});
