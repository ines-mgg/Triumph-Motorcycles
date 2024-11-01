import { SparePart } from './sparePart';
import { Parts } from '@triumph-motorcycles/domain/errors';

const { InvalidOrderError } = Parts;

export class OrderItem {
  constructor(
    public sparePart: SparePart,
    public quantityOrdered: number,
    public costPerUnit: number,
    public deliveredQuantity: number = 0,
  ) {
    this.validateInputs();
  }

  private validateInputs(): void {
    if (!this.sparePart) {
      throw new InvalidOrderError(
        'La pièce de rechange ne peut pas être nulle.',
      );
    }
    if (this.quantityOrdered <= 0) {
      throw new InvalidOrderError(
        'La quantité commandée doit être un nombre positif.',
      );
    }
    if (this.costPerUnit <= 0) {
      throw new InvalidOrderError(
        'Le coût par unité doit être un nombre positif.',
      );
    }
  }

  getTotalCost(): number {
    return this.quantityOrdered * this.costPerUnit;
  }

  updateDelivery(deliveredQty: number): void {
    if (deliveredQty < 0) {
      throw new InvalidOrderError(
        'La quantité livrée ne peut pas être négative.',
      );
    }

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
