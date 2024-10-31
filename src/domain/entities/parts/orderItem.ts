import { SparePart } from './sparePart';

export class OrderItem {
  constructor(
    public sparePart: SparePart,
    public quantityOrdered: number,
    public costPerUnit: number,
    public deliveredQuantity: number = 0,
  ) {}

  getTotalCost(): number {
    return this.quantityOrdered * this.costPerUnit;
  }

  updateDelivery(deliveredQty: number): void {
    this.deliveredQuantity = Math.min(
      this.quantityOrdered,
      this.deliveredQuantity + deliveredQty,
    );
  }

  isFullyDelivered(): boolean {
    return this.deliveredQuantity >= this.quantityOrdered;
  }

  getRemainingQuantity(): number {
    return this.quantityOrdered - this.deliveredQuantity;
  }

  getDeliveredQty(): number {
    return this.deliveredQuantity;
  }
}
