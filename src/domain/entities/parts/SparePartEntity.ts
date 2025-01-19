import { SparePartName } from '../../values/sparePart/SparePartName';
import { SparePartQuantityInStock } from '../../values/sparePart/SparePartQuantityInStock';
import { SparePartCriticalLevel } from '../../values/sparePart/SparePartCriticalLevel';
import { SparePartCost } from '../../values/sparePart/SparePartCost';
import { Parts } from '@triumph-motorcycles/domain/errors';

const { InsufficientStockError, InvalidQuantityError } = Parts;

export class SparePartEntity {
  private totalUsage: number = 0;
  private reservedStock: number = 0;

  private constructor(
    public readonly id: string,
    public readonly name: SparePartName,
    public quantityInStock: SparePartQuantityInStock,
    public criticalLevel: SparePartCriticalLevel,
    public cost: SparePartCost,
  ) {}

  public static create(
    id: string,
    nameValue: string,
    quantityInStockValue: number,
    criticalLevelValue: number,
    costValue: number
  ): SparePartEntity | Error {
    const name = SparePartName.from(nameValue);
    if (name instanceof Error) {
      throw new InvalidQuantityError(name.message);
    }

    const quantityInStock = SparePartQuantityInStock.from(quantityInStockValue);
    if (quantityInStock instanceof Error) {
      throw new InvalidQuantityError(quantityInStock.message);
    }

    const criticalLevel = SparePartCriticalLevel.from(criticalLevelValue);
    if (criticalLevel instanceof Error) {
      throw new InvalidQuantityError(criticalLevel.message);
    }

    const cost = SparePartCost.from(costValue);
    if (cost instanceof Error) {
      throw new InvalidQuantityError(cost.message);
    }

    return new SparePartEntity(id, name, quantityInStock, criticalLevel, cost);
  }

  restock(quantity: number): void {
    const quantityInStock = SparePartQuantityInStock.from(this.quantityInStock.value + quantity);
    if (quantityInStock instanceof Error) {
      throw new InvalidQuantityError(quantityInStock.message);
    }
    this.quantityInStock = quantityInStock;
  }

  reserve(quantity: number): boolean {
    if (quantity < 0) {
      throw new InvalidQuantityError('Reserved quantity cannot be negative.');
    }
    if (quantity <= this.quantityInStock.value - this.reservedStock) {
      this.reservedStock += quantity;
      return true;
    }
    throw new InsufficientStockError('Insufficient stock for reservation.');
  }

  releaseReserved(quantity: number): void {
    if (quantity < 0) {
      throw new InvalidQuantityError('Released quantity cannot be negative.');
    }
    this.reservedStock = Math.max(0, this.reservedStock - quantity);
  }

  isStockLow(): boolean {
    return this.quantityInStock.value - this.reservedStock <= this.criticalLevel.value;
  }

  use(quantity: number): boolean {
    if (quantity < 0) {
      throw new InvalidQuantityError('Used quantity cannot be negative.');
    }
    if (quantity <= this.quantityInStock.value - this.reservedStock) {
      const newQuantity = this.quantityInStock.value - quantity;
      this.quantityInStock = SparePartQuantityInStock.from(newQuantity) as SparePartQuantityInStock;
      this.totalUsage += quantity;
      this.reservedStock = Math.max(0, this.reservedStock - quantity);
      return true;
    }
    throw new InsufficientStockError('Insufficient stock for usage.');
  }

  getTotalUsage(): number {
    return this.totalUsage;
  }

  getReservedStock(): number {
    return this.reservedStock;
  }
}
