import { OrderItemQuantityExceedError } from '../../errors/orderItem/OrderItemQuantityExceedError';
import { OrderItemCostPerUnit } from '../../values/orderItem/OrderItemCostPerUnit';
import { OrderItemDeliveredQuantity } from '../../values/orderItem/OrderItemDeliveredQuantity';
import { OrderItemQuantityOrdered } from '../../values/orderItem/OrderItemQuantityOrdered';
import { SparePartEntity } from './SparePartEntity';
import crypto from 'crypto';

export class OrderItemEntity {
  private constructor(
    private readonly id: string,
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
    const id = crypto.randomUUID();

    const quantityOrdered = OrderItemQuantityOrdered.from(quantityOrderedValue);
    if (quantityOrdered instanceof Error) return quantityOrdered;

    const costPerUnit = OrderItemCostPerUnit.from(costPerUnitValue);
    if (costPerUnit instanceof Error) return costPerUnit;

    const deliveredQuantity = OrderItemDeliveredQuantity.from(deliveredQuantityValue, quantityOrdered);
    if (deliveredQuantity instanceof Error) return deliveredQuantity;

    return new OrderItemEntity(id, sparePart, quantityOrdered, costPerUnit, deliveredQuantity);
  }

  getId(): string {
    return this.id;
  }

  getTotalCost(): number {
    return this.quantityOrdered.value * this.costPerUnit.value;
  }

  updateDelivery(deliveredQty: number): void | Error {
    if (deliveredQty > this.quantityOrdered.value) {
      return new OrderItemQuantityExceedError();
    }
  
    const deliveredQuantity = OrderItemDeliveredQuantity.from(deliveredQty, this.quantityOrdered);
    if (deliveredQuantity instanceof Error) return deliveredQuantity;
  
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
