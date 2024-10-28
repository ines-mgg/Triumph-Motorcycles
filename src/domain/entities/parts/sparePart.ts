export class SparePart {
  private totalUsage: number = 0;
  private reservedStock: number = 0;

  constructor(
    public id: string,
    public name: string,
    public quantityInStock: number,
    public criticalLevel: number,
    public cost: number,
  ) {}

  restock(quantity: number): void {
    this.quantityInStock += quantity;
  }

  reserve(quantity: number): boolean {
    if (quantity <= this.quantityInStock - this.reservedStock) {
      this.reservedStock += quantity;
      return true;
    }
    return false;
  }

  releaseReserved(quantity: number): void {
    this.reservedStock = Math.max(0, this.reservedStock - quantity);
  }

  isStockLow(): boolean {
    return this.quantityInStock - this.reservedStock <= this.criticalLevel;
  }

  use(quantity: number): boolean {
    if (quantity <= this.quantityInStock - this.reservedStock) {
      this.quantityInStock -= quantity;
      this.totalUsage += quantity;
      this.reservedStock = Math.max(0, this.reservedStock - quantity);
      return true;
    }
    return false;
  }

  getTotalUsage(): number {
    return this.totalUsage;
  }

  getReservedStock(): number {
    return this.reservedStock;
  }
}
