import { SparePart } from './sparePart';

export class OrderItem {
  constructor(
    public sparePart: SparePart,
    public quantityOrdered: number,
    public costPerUnit: number,
    public deliveredQuantity: number = 0,
  ) {}

  // Calculate the total cost for this item
  getTotalCost(): number {
    return this.quantityOrdered * this.costPerUnit;
  }

  // Update the delivered quantity and check remaining quantity
  updateDelivery(deliveredQty: number): void {
    this.deliveredQuantity = Math.min(
      this.quantityOrdered,
      this.deliveredQuantity + deliveredQty,
    );
  }

  // Check if the item is fully delivered
  isFullyDelivered(): boolean {
    return this.deliveredQuantity >= this.quantityOrdered;
  }

  // Get remaining quantity to be delivered
  getRemainingQuantity(): number {
    return this.quantityOrdered - this.deliveredQuantity;
  }
}
