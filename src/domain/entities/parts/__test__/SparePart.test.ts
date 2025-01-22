import { OrderItemQuantityOrderedError } from "../../../errors/orderItem/OrderItemQuantityOrderedError";
import { SparePartEntity } from "../SparePartEntity";

describe('SparePartEntity', () => {
    describe('create', () => {
      it('should create a valid SparePartEntity', () => {
        const sparePart = SparePartEntity.create('Brake Pads', 100, 20, 50);
        expect(sparePart).toBeInstanceOf(SparePartEntity);
      });
  
      it('should return an error if name is invalid', () => {
        const sparePart = SparePartEntity.create('', 100, 20, 50);
        expect(sparePart).toBeInstanceOf(Error);
      });
  
      it('should return an error if quantityInStock is negative', () => {
        const sparePart = SparePartEntity.create('Brake Pads', -5, 20, 50);
        expect(sparePart).toBeInstanceOf(Error);
      });
  
      it('should return an error if criticalLevel is invalid', () => {
        const sparePart = SparePartEntity.create('Brake Pads', 100, 5, 50);
        expect(sparePart).toBeInstanceOf(Error);
      });
  
      it('should return an error if cost is negative', () => {
        const sparePart = SparePartEntity.create('Brake Pads', 100, 20, -50);
        expect(sparePart).toBeInstanceOf(Error);
      });
    });
  
    describe('restock', () => {
      it('should increase the stock quantity when valid quantity is added', () => {
        const sparePart = SparePartEntity.create('Brake Pads', 500, 20, 50);
        if (sparePart instanceof SparePartEntity) {
          sparePart.restock(50);
          expect(sparePart.quantityInStock.value).toBe(550);
        }
      });
  
      it('should return an error if the restock quantity is invalid', () => {
        const sparePart = SparePartEntity.create('Brake Pads', 100, 20, 50);
        if (sparePart instanceof SparePartEntity) {
          const result = sparePart.restock(-10);
          expect(result).toBeInstanceOf(Error);
        }
      });
    });
  
    describe('reserve', () => {
      it('should reserve stock successfully if enough stock is available', () => {
        const sparePart = SparePartEntity.create('Brake Pads', 100, 20, 50) as SparePartEntity;
        const result = sparePart.reserve(30);
        expect(result).toBe(true);
        expect(sparePart.getReservedStock()).toBe(30);
      });
  
      it('should return an error if not enough stock is available for reservation', () => {
        const sparePart = SparePartEntity.create('Brake Pads', 100, 20, 50) as SparePartEntity;
        const result = sparePart.reserve(150);
        expect(result).toBeInstanceOf(OrderItemQuantityOrderedError);
      });
    });
  
    describe('releaseReserved', () => {
      it('should release reserved stock successfully', () => {
        const sparePart = SparePartEntity.create('Brake Pads', 100, 20, 50) as SparePartEntity;
        sparePart.reserve(30);
        sparePart.releaseReserved(20);
        expect(sparePart.getReservedStock()).toBe(10);
      });
  
      it('should handle releasing more than the reserved stock gracefully', () => {
        const sparePart = SparePartEntity.create('Brake Pads', 100, 20, 50) as SparePartEntity;
        sparePart.reserve(30);
        sparePart.releaseReserved(50);
        expect(sparePart.getReservedStock()).toBe(0);
      });
    });
  
    describe('use', () => {
      it('should decrease stock quantity and total usage on successful use', () => {
        const sparePart = SparePartEntity.create('Brake Pads', 100, 20, 50) as SparePartEntity;
        const result = sparePart.use(30);
        expect(result).toBe(true);
        expect(sparePart.quantityInStock.value).toBe(70);
        expect(sparePart.getTotalUsage()).toBe(30);
      });
  
      it('should return an error if attempting to use more than available stock', () => {
        const sparePart = SparePartEntity.create('Brake Pads', 100, 20, 50) as SparePartEntity;
        const result = sparePart.use(150);
        expect(result).toBeInstanceOf(OrderItemQuantityOrderedError);
      });
  
      it('should deduct reserved stock before general stock when using parts', () => {
        const sparePart = SparePartEntity.create('Brake Pads', 100, 20, 50) as SparePartEntity;
        sparePart.reserve(30);
        const result = sparePart.use(20);
        expect(result).toBe(true);
        expect(sparePart.quantityInStock.value).toBe(80);
        expect(sparePart.getReservedStock()).toBe(10);
      });
    });
  
    describe('isStockLow', () => {
      it('should return true if stock is at or below the critical level', () => {
        const sparePart = SparePartEntity.create('Brake Pads', 20, 20, 50) as SparePartEntity;
        expect(sparePart.isStockLow()).toBe(true);
      });
  
      it('should return false if stock is above the critical level', () => {
        const sparePart = SparePartEntity.create('Brake Pads', 100, 20, 50) as SparePartEntity;
        expect(sparePart.isStockLow()).toBe(false);
      });
    });
  
    describe('getTotalUsage', () => {
      it('should accurately track the total usage of spare parts', () => {
        const sparePart = SparePartEntity.create('Brake Pads', 100, 20, 50) as SparePartEntity;
        sparePart.use(30);
        sparePart.use(20);
        expect(sparePart.getTotalUsage()).toBe(50);
      });
    });
  
    describe('getReservedStock', () => {
      it('should return the correct reserved stock quantity', () => {
        const sparePart = SparePartEntity.create('Brake Pads', 100, 20, 50) as SparePartEntity;
        sparePart.reserve(30);
        expect(sparePart.getReservedStock()).toBe(30);
      });
    });
  });