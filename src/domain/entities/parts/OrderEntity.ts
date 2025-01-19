import { OrderItemEntity } from './OrderItemEntity';
import { SparePartEntity } from './SparePartEntity';
import { Parts } from '@triumph-motorcycles/domain/errors';
import { OrderDate } from '../../values/order/OrderDate';
import { EstimatedDeliveryDate } from '../../values/order/EstimatedDeliveryDate'; 
import { OrderSparePartNullError } from '../../errors/order/OrderSparePartNullError';
import { OrderSparePartQuantityError } from '../../errors/order/OrderSparePartQuantityError';
import { OrderSparePartCostPerUnitError } from '../../errors/order/OrderSparePartCostPerUnitError';

const { InvalidOrderError } = Parts;

export class OrderEntity {
  private readonly items: OrderItemEntity[] = [];
  private totalCost: number = 0;

  private constructor(
    public readonly orderId: string,
    private readonly orderDate: OrderDate,
    private readonly estimatedDeliveryDate: EstimatedDeliveryDate,
  ) {}

  public static create(
    orderId: string,
    orderDateValue: Date,
    estimatedDeliveryDateValue: Date,
  ): OrderEntity | Error {

    const orderDate = OrderDate.from(orderDateValue);
    if (orderDate instanceof Error) {
      return orderDate; 
    }

    const estimatedDeliveryDate = EstimatedDeliveryDate.from(
      estimatedDeliveryDateValue,
      orderDate.value
    );
    if (estimatedDeliveryDate instanceof Error) {
      return estimatedDeliveryDate; 
    }

    return new OrderEntity(orderId, orderDate, estimatedDeliveryDate);
  }

  addItem(sparePart: SparePartEntity, quantity: number, costPerUnit: number): void {
    if (!sparePart) {
      throw new OrderSparePartNullError();
    }
    if (quantity <= 0 || typeof quantity !== 'number') {
      throw new OrderSparePartQuantityError();
    }
    if (costPerUnit <= 0 || typeof costPerUnit !== 'number') {
      throw new OrderSparePartCostPerUnitError();
    }

    const item = OrderItemEntity.create(sparePart, quantity, costPerUnit);
    if (item instanceof Error) {
      throw new InvalidOrderError(item.message);
    }
    this.items.push(item);
    this.totalCost += item.getTotalCost();
  }

  updateItemDelivery(sparePartId: string, deliveredQty: number): void {
    if (!sparePartId) {
      throw new InvalidOrderError('Spare part ID cannot be empty.');
    }
    if (deliveredQty < 0 || typeof deliveredQty !== 'number') {
      throw new InvalidOrderError('Delivered quantity must be a positive number.');
    }

    const item = this.items.find((item) => item.sparePart.id === sparePartId);
    if (!item) {
      throw new InvalidOrderError('The specified order item does not exist.');
    }
    const availableQuantity = item.quantityOrdered.value;
    const currentDeliveredQuantity = item.deliveredQuantity.value; 
  
    if (deliveredQty > availableQuantity - currentDeliveredQuantity) {
      throw new InvalidOrderError('Delivered quantity cannot exceed undelivered quantity.');
    }

    item.updateDelivery(deliveredQty);
  }

  getTotalCost(): number {
    return this.totalCost;
  }

  isOrderFullyDelivered(): boolean {
    return this.items.every((item) => item.isFullyDelivered());
  }

  getUndeliveredItems(): OrderItemEntity[] {
    return this.items.filter((item) => !item.isFullyDelivered());
  }

  getItems(): OrderItemEntity[] {
    return this.items;
  }

  getOrderDate(): Date {
    return this.orderDate.value;
  }

  getEstimatedDeliveryDate(): Date {
    return this.estimatedDeliveryDate.value;
  }
}
