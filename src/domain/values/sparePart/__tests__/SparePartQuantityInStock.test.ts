import { SparePartQuantityInStock } from '../SparePartQuantityInStock';
import { SparePartQuantityInStockError } from '@triumph-motorcycles/domain/errors';

describe('SparePartQuantityInStock', () => {
  it('should create a valid SparePartQuantityInStock instance', () => {
    const value = 10;
    const sparePartQuantityInStock = SparePartQuantityInStock.from(value);
    expect(sparePartQuantityInStock).toBeInstanceOf(SparePartQuantityInStock);
    if (sparePartQuantityInStock instanceof SparePartQuantityInStock) {
      expect(sparePartQuantityInStock.value).toBe(value);
    }
  });

  it('should return an error for negative quantity', () => {
    const value = -5;
    const sparePartQuantityInStock = SparePartQuantityInStock.from(value);
    expect(sparePartQuantityInStock).toBeInstanceOf(
      SparePartQuantityInStockError,
    );
  });

  it('should compare spare part quantity in stock value correctly', () => {
    const value = 10;
    const sparePartQuantityInStock = SparePartQuantityInStock.from(value);
    if (sparePartQuantityInStock instanceof SparePartQuantityInStock) {
      expect(sparePartQuantityInStock.isValue(value)).toBe(true);
      expect(sparePartQuantityInStock.isValue(20)).toBe(false);
    }
  });

  it('should compare two SparePartQuantityInStock instances correctly', () => {
    const value1 = 10;
    const value2 = 20;
    const sparePartQuantityInStock1 = SparePartQuantityInStock.from(value1);
    const sparePartQuantityInStock2 = SparePartQuantityInStock.from(value2);
    const sparePartQuantityInStock3 = SparePartQuantityInStock.from(value1);

    if (
      sparePartQuantityInStock1 instanceof SparePartQuantityInStock &&
      sparePartQuantityInStock2 instanceof SparePartQuantityInStock &&
      sparePartQuantityInStock3 instanceof SparePartQuantityInStock
    ) {
      expect(sparePartQuantityInStock1.is(sparePartQuantityInStock2)).toBe(
        false,
      );
      expect(sparePartQuantityInStock1.is(sparePartQuantityInStock3)).toBe(
        true,
      );
    }
  });
});
