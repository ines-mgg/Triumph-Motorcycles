import { OrderItemCostPerUnit } from '../../values/orderItem/OrderItemCostPerUnit';
import { OrderItemDeliveredQuantity } from '../../values/orderItem/OrderItemDeliveredQuantity';
import { OrderItemQuantityOrdered } from '../../values/orderItem/OrderItemQuantityOrdered';
import { SparePartEntity } from './SparePartEntity';
import { Parts } from '@triumph-motorcycles/domain/errors';

const { InvalidOrderError } = Parts;

export class OrderItemEntity {
  private constructor(
    public readonly sparePart: SparePartEntity,
    public readonly quantityOrdered: OrderItemQuantityOrdered,
    public readonly costPerUnit: OrderItemCostPerUnit,
    public deliveredQuantity: OrderItemDeliveredQuantity,
  ) {}

  public static create(
    sparePart: SparePartEntity,
    quantityOrderedValue: number,
    costPerUnitValue: number,
    deliveredQuantityValue: number = 0
  ): OrderItemEntity | Error {
    if (!sparePart) {
      throw new InvalidOrderError('Spare part cannot be null.');
    }

    const quantityOrdered = OrderItemQuantityOrdered.from(quantityOrderedValue);
    if (quantityOrdered instanceof Error) {
      throw new InvalidOrderError(quantityOrdered.message);
    }

    const costPerUnit = OrderItemCostPerUnit.from(costPerUnitValue);
    if (costPerUnit instanceof Error) {
      throw new InvalidOrderError(costPerUnit.message);
    }

    const deliveredQuantity = OrderItemDeliveredQuantity.from(deliveredQuantityValue, quantityOrdered);
    if (deliveredQuantity instanceof Error) {
      throw new InvalidOrderError(deliveredQuantity.message);
    }

    return new OrderItemEntity(sparePart, quantityOrdered, costPerUnit, deliveredQuantity);
  }

  getTotalCost(): number {
    return this.quantityOrdered.value * this.costPerUnit.value;
  }

  updateDelivery(deliveredQty: number): void {
    const deliveredQuantity = OrderItemDeliveredQuantity.from(deliveredQty, this.quantityOrdered);
    if (deliveredQuantity instanceof Error) {
      throw new InvalidOrderError(deliveredQuantity.message);
    }

    this.deliveredQuantity = deliveredQuantity;
  }

  isFullyDelivered(): boolean {
    return this.deliveredQuantity.value >= this.quantityOrdered.value;
  }

  getRemainingQuantity(): number {
    return this.quantityOrdered.value - this.deliveredQuantity.value;
  }

  getDeliveredQty(): number {
    return this.deliveredQuantity.value;
  }
}
