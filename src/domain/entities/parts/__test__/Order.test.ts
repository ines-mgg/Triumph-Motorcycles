import { SparePartEntity } from "../SparePartEntity";
import { OrderEntity } from "../OrderEntity";
import { SparePartQuantityInStockError } from "../../../errors/sparePart/SparePartQuantityInStockError";

describe('OrderEntity', () => {
  let orderDate: Date;
  let estimatedDeliveryDate: Date;
  let sparePart: SparePartEntity;

  beforeEach(() => {
    orderDate = new Date();
    estimatedDeliveryDate = new Date(orderDate);
    estimatedDeliveryDate.setDate(orderDate.getDate() + 7);
    sparePart = SparePartEntity.create('Brake Pad', 50, 20, 15) as SparePartEntity;
  });

  describe('create', () => {
    it('should successfully create an OrderEntity with orderDate as now or in the future', () => {
      const order = OrderEntity.create(orderDate, estimatedDeliveryDate);
      if (order instanceof Error) {
        console.log("Order creation error", order);
        fail('Order creation should not fail');
      }
      if (order instanceof OrderEntity) {
        expect(order.getOrderDate()).toEqual(orderDate);
        expect(order.getEstimatedDeliveryDate()).toEqual(estimatedDeliveryDate);
      }
    });

    it('should display error message if order date is in the past', () => {
      const pastDate = new Date('2023-01-01');
      const order = OrderEntity.create(pastDate, estimatedDeliveryDate);
      expect(order).toBeInstanceOf(Error);
    });

    it('should display error message if estimated delivery date is invalid', () => {
      const invalidDeliveryDate = new Date(orderDate);
      invalidDeliveryDate.setDate(orderDate.getDate() + 400);
      const order = OrderEntity.create(orderDate, invalidDeliveryDate);
      expect(order).toBeInstanceOf(Error);
    });
  });

  describe('addItem', () => {
    it('should add an item to the order and update total cost', () => {
      const order = OrderEntity.create(orderDate, estimatedDeliveryDate) as OrderEntity;
      order.addItem(sparePart, 5, 10);
      const items = order.getItems();
      expect(items.length).toBe(1);
      expect(items[0].getTotalCost()).toBe(50);
      expect(order.getTotalCost()).toBe(50);
    });

    it('should return an error if item quantity exceeds stock', () => {
      const order = OrderEntity.create(orderDate, estimatedDeliveryDate) as OrderEntity;
      const exceedingQuantity = sparePart.quantityInStock.value + 4; 
      const result = order.addItem(sparePart, exceedingQuantity, 10);
      expect(result).toBeInstanceOf(SparePartQuantityInStockError); 
    });
  });

});
