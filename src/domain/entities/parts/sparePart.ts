import { Parts } from '@triumph-motorcycles/domain/errors';

const { InsufficientStockError, InvalidQuantityError } = Parts;

export class SparePart {
  private totalUsage: number = 0;
  private reservedStock: number = 0;

  constructor(
    public id: string,
    public name: string,
    public quantityInStock: number,
    public criticalLevel: number,
    public cost: number,
  ) {
    this.validateInputs();
  }

  private validateInputs(): void {
    if (this.quantityInStock < 0) {
      throw new InvalidQuantityError(
        'La quantité en stock ne peut pas être négative.',
      );
    }
    if (this.criticalLevel < 0) {
      throw new InvalidQuantityError(
        'Le niveau critique ne peut pas être négatif.',
      );
    }
    if (this.cost < 0) {
      throw new InvalidQuantityError('Le coût ne peut pas être négatif.');
    }
  }

  restock(quantity: number): void {
    if (quantity < 0) {
      throw new InvalidQuantityError(
        'La quantité à réapprovisionner ne peut pas être négative.',
      );
    }
    this.quantityInStock += quantity;
  }

  reserve(quantity: number): boolean {
    if (quantity < 0) {
      throw new InvalidQuantityError(
        'La quantité réservée ne peut pas être négative.',
      );
    }
    if (quantity <= this.quantityInStock - this.reservedStock) {
      this.reservedStock += quantity;
      return true;
    }
    throw new InsufficientStockError(
      'Stock insuffisant pour réserver la quantité demandée.',
    );
  }

  releaseReserved(quantity: number): void {
    if (quantity < 0) {
      throw new InvalidQuantityError(
        'La quantité à libérer ne peut pas être négative.',
      );
    }
    this.reservedStock = Math.max(0, this.reservedStock - quantity);
  }

  isStockLow(): boolean {
    return this.quantityInStock - this.reservedStock <= this.criticalLevel;
  }

  use(quantity: number): boolean {
    if (quantity < 0) {
      throw new InvalidQuantityError(
        'La quantité à utiliser ne peut pas être négative.',
      );
    }
    if (quantity <= this.quantityInStock - this.reservedStock) {
      this.quantityInStock -= quantity;
      this.totalUsage += quantity;
      this.reservedStock = Math.max(0, this.reservedStock - quantity);
      return true;
    }
    throw new InsufficientStockError(
      'Stock insuffisant pour utiliser la quantité demandée.',
    );
  }

  getTotalUsage(): number {
    return this.totalUsage;
  }

  getReservedStock(): number {
    return this.reservedStock;
  }
}
