import { OrderItem } from './orderItem';
import { SparePart } from './sparePart';

export class Order {
  private items: OrderItem[] = []; // List of items in the order
  private orderDate: Date;
  private estimatedDeliveryDate: Date;
  private totalCost: number = 0;

  constructor(
    public orderId: string,
    orderDate: Date,
    estimatedDeliveryDate: Date,
  ) {
    this.orderDate = orderDate;
    this.estimatedDeliveryDate = estimatedDeliveryDate;
  }

  // Add an item to the order
  addItem(sparePart: SparePart, quantity: number, costPerUnit: number): void {
    const item = new OrderItem(sparePart, quantity, costPerUnit);
    this.items.push(item);
    this.totalCost += item.getTotalCost();
  }

  // Update delivery for an item by spare part ID
  updateItemDelivery(sparePartId: string, deliveredQty: number): void {
    const item = this.items.find((item) => item.sparePart.id === sparePartId);
    if (item) {
      item.updateDelivery(deliveredQty);
    }
  }

  // Get the total cost of the order
  getTotalCost(): number {
    return this.totalCost;
  }

  // Check if the entire order is fully delivered
  isOrderFullyDelivered(): boolean {
    return this.items.every((item) => item.isFullyDelivered());
  }

  // Get details of undelivered items
  getUndeliveredItems(): OrderItem[] {
    return this.items.filter((item) => !item.isFullyDelivered());
  }

  // Retrieve the full list of items in the order
  getItems(): OrderItem[] {
    return this.items;
  }

  // Get order date
  getOrderDate(): Date {
    return this.orderDate;
  }

  // Get estimated delivery date
  getEstimatedDeliveryDate(): Date {
    return this.estimatedDeliveryDate;
  }
}
