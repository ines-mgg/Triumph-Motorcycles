import { OrderItem } from './orderItem';
import { SparePart } from './sparePart';

export class Order {
  private readonly items: OrderItem[] = []; 
  private readonly orderDate: Date;
  private readonly estimatedDeliveryDate: Date;
  private totalCost: number = 0;

  constructor(
    public orderId: string,
    orderDate: Date,
    estimatedDeliveryDate: Date,
  ) {
    this.orderDate = orderDate;
    this.estimatedDeliveryDate = estimatedDeliveryDate;
  }

  addItem(sparePart: SparePart, quantity: number, costPerUnit: number): void {
    const item = new OrderItem(sparePart, quantity, costPerUnit);
    this.items.push(item);
    this.totalCost += item.getTotalCost();
  }

  updateItemDelivery(sparePartId: string, deliveredQty: number): void {
    const item = this.items.find((item) => item.sparePart.id === sparePartId);
    if (item) {
      item.updateDelivery(deliveredQty);
    }
  }

  getTotalCost(): number {
    return this.totalCost;
  }

  isOrderFullyDelivered(): boolean {
    return this.items.every((item) => item.isFullyDelivered());
  }

  getUndeliveredItems(): OrderItem[] {
    return this.items.filter((item) => !item.isFullyDelivered());
  }

  getItems(): OrderItem[] {
    return this.items;
  }

  getOrderDate(): Date {
    return this.orderDate;
  }

  getEstimatedDeliveryDate(): Date {
    return this.estimatedDeliveryDate;
  }
}
