import { OrderItemQuantityOrdered } from "../../../values/orderItem/OrderItemQuantityOrdered";
import { OrderItemEntity } from "../OrderItemEntity";
import { SparePartEntity } from "../SparePartEntity";
import { OrderItemCostPerUnit } from "../../../values/orderItem/OrderItemCostPerUnit";
import { OrderItemDeliveredQuantity } from "../../../values/orderItem/OrderItemDeliveredQuantity";

describe('OrderItemEntity', () => {
  let sparePart: SparePartEntity;

  beforeEach(() => {
    const name = 'Brake Pad';
    const quantityInStock = 50;
    const criticalLevel = 10;
    const cost = 100;

    sparePart = SparePartEntity.create(name, quantityInStock, criticalLevel, cost) as SparePartEntity;
  });

  describe('create', () => {
    it('should successfully create an OrderItemEntity with valid inputs', () => {
      const orderItem = OrderItemEntity.create(sparePart, 5, 20);

      expect(orderItem).toBeInstanceOf(OrderItemEntity);

      if (orderItem instanceof OrderItemEntity) {
        expect(orderItem.sparePart).toBe(sparePart);
        expect(orderItem.quantityOrdered).toBeInstanceOf(OrderItemQuantityOrdered);
        expect(orderItem.quantityOrdered.value).toEqual(5);
        expect(orderItem.costPerUnit).toBeInstanceOf(OrderItemCostPerUnit);
        expect(orderItem.costPerUnit.value).toEqual(20);
        expect(orderItem.deliveredQuantity).toBeInstanceOf(OrderItemDeliveredQuantity);
        expect(orderItem.deliveredQuantity.value).toEqual(0);
      }
    });

    it('should return an error if quantityOrdered is invalid', () => {
      const orderItem = OrderItemEntity.create(sparePart, -1, 20);

      expect(orderItem).toBeInstanceOf(Error);
    });

    it('should return an error if costPerUnit is invalid', () => {
      const orderItem = OrderItemEntity.create(sparePart, 5, -20);

      expect(orderItem).toBeInstanceOf(Error);
    });

    it('should return an error if deliveredQuantity is invalid', () => {
      const orderItem = OrderItemEntity.create(sparePart, 5, 20, 6); 

      expect(orderItem).toBeInstanceOf(Error);
    });
  });

  describe('getTotalCost', () => {
    it('should correctly calculate the total cost of the order item', () => {
      const orderItem = OrderItemEntity.create(sparePart, 5, 20) as OrderItemEntity;

      expect(orderItem.getTotalCost()).toEqual(5 * 20);
    });
  });

  describe('updateDelivery', () => {
    it('should successfully update the delivered quantity', () => {
      const orderItem = OrderItemEntity.create(sparePart, 5, 20) as OrderItemEntity;

      const result = orderItem.updateDelivery(3);

      expect(result).toBeUndefined();
      expect(orderItem.getDeliveredQty()).toEqual(3);
    });

    it('should return an error if delivered quantity exceeds ordered quantity', () => {
      const orderItem = OrderItemEntity.create(sparePart, 5, 20) as OrderItemEntity;

      const result = orderItem.updateDelivery(6);

      expect(result).toBeInstanceOf(Error);
      expect(orderItem.getDeliveredQty()).toEqual(0); 
    });
  });

  describe('isFullyDelivered', () => {
    it('should return true if the order item is fully delivered', () => {
      const orderItem = OrderItemEntity.create(sparePart, 5, 20) as OrderItemEntity;

      orderItem.updateDelivery(5);

      expect(orderItem.isFullyDelivered()).toBeTruthy();
    });

    it('should return false if the order item is not fully delivered', () => {
      const orderItem = OrderItemEntity.create(sparePart, 5, 20) as OrderItemEntity;

      orderItem.updateDelivery(3);

      expect(orderItem.isFullyDelivered()).toBeFalsy();
    });
  });

  describe('getRemainingQuantity', () => {
    it('should correctly calculate the remaining quantity', () => {
      const orderItem = OrderItemEntity.create(sparePart, 5, 20) as OrderItemEntity;

      orderItem.updateDelivery(2);

      expect(orderItem.getRemainingQuantity()).toEqual(3);
    });

    it('should return the full ordered quantity if nothing is delivered', () => {
      const orderItem = OrderItemEntity.create(sparePart, 5, 20) as OrderItemEntity;

      expect(orderItem.getRemainingQuantity()).toEqual(5);
    });
  });

  describe('getId', () => {
    it('should return the unique ID of the order item', () => {
      const orderItem = OrderItemEntity.create(sparePart, 5, 20) as OrderItemEntity;

      expect(orderItem.getId()).toBeDefined();
      expect(typeof orderItem.getId()).toBe('string');
    });
  });
});
