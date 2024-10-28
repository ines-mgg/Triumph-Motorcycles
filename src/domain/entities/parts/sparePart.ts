export class SparePart {
  private totalUsage: number = 0; // Track total usage for inventory insights
  private reservedStock: number = 0; // Track parts reserved for upcoming maintenance

  constructor(
    public id: string,
    public name: string,
    public quantityInStock: number,
    public criticalLevel: number,
    public cost: number,
  ) {}

  // Update the quantity of stock after a new delivery or adjustment
  restock(quantity: number): void {
    this.quantityInStock += quantity;
  }

  // Update the reserved stock for planned maintenance
  reserve(quantity: number): boolean {
    if (quantity <= this.quantityInStock - this.reservedStock) {
      this.reservedStock += quantity;
      return true;
    }
    return false;
  }

  // Release reserved stock if maintenance is canceled or modified
  releaseReserved(quantity: number): void {
    this.reservedStock = Math.max(0, this.reservedStock - quantity);
  }

  // Check if the stock is at or below the critical level
  isStockLow(): boolean {
    return this.quantityInStock - this.reservedStock <= this.criticalLevel;
  }

  // Use stock for maintenance and track total usage
  use(quantity: number): boolean {
    if (quantity <= this.quantityInStock - this.reservedStock) {
      this.quantityInStock -= quantity;
      this.totalUsage += quantity;
      this.reservedStock = Math.max(0, this.reservedStock - quantity); // Adjust reserved stock if applicable
      return true;
    }
    return false;
  }

  // Get total usage of this part for reporting
  getTotalUsage(): number {
    return this.totalUsage;
  }

  // Check how much stock is currently reserved
  getReservedStock(): number {
    return this.reservedStock;
  }
}
