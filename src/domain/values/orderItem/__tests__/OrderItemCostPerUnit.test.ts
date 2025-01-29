import { OrderItemCostPerUnit } from '../OrderItemCostPerUnit';
import { OrderItemCostPerUnitError } from '@triumph-motorcycles/domain/errors/orderItem/OrderItemCostPerUnitError';

describe('OrderItemCostPerUnit', () => {
  it('should create a valid OrderItemCostPerUnit instance', () => {
    const value = 100;
    const costPerUnit = OrderItemCostPerUnit.from(value);
    expect(costPerUnit).toBeInstanceOf(OrderItemCostPerUnit);
    if (costPerUnit instanceof OrderItemCostPerUnit) {
      expect(costPerUnit.value).toBe(value);
    }
  });

  it('should return an error for zero or negative cost per unit', () => {
    expect(OrderItemCostPerUnit.from(0)).toBeInstanceOf(
      OrderItemCostPerUnitError,
    );
    expect(OrderItemCostPerUnit.from(-100)).toBeInstanceOf(
      OrderItemCostPerUnitError,
    );
  });

  it('should compare cost per unit value correctly', () => {
    const value = 100;
    const costPerUnit = OrderItemCostPerUnit.from(value);
    if (costPerUnit instanceof OrderItemCostPerUnit) {
      expect(costPerUnit.isValue(value)).toBe(true);
      expect(costPerUnit.isValue(200)).toBe(false);
    }
  });

  it('should compare two OrderItemCostPerUnit instances correctly', () => {
    const value1 = 100;
    const value2 = 200;
    const costPerUnit1 = OrderItemCostPerUnit.from(value1);
    const costPerUnit2 = OrderItemCostPerUnit.from(value2);
    const costPerUnit3 = OrderItemCostPerUnit.from(value1);

    if (
      costPerUnit1 instanceof OrderItemCostPerUnit &&
      costPerUnit2 instanceof OrderItemCostPerUnit &&
      costPerUnit3 instanceof OrderItemCostPerUnit
    ) {
      expect(costPerUnit1.is(costPerUnit2)).toBe(false);
      expect(costPerUnit1.is(costPerUnit3)).toBe(true);
    }
  });
});
