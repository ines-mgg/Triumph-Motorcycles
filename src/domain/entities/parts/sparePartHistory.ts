import { SparePart } from './sparePart';

export class SparePartOrderRecord {
  constructor(
    public orderId: string,
    public sparePartId: string,
    public partName: string,
    public orderDate: Date,
    public quantityOrdered: number,
    public costPerUnit: number,
    public totalCost: number,
    public estimatedDeliveryDate: Date,
    public deliveredQuantity: number = 0,
    public remainingQuantity: number = 0,
  ) {}

  // Update delivered quantity and calculate remaining stock
  updateDelivery(deliveredQty: number): void {
    this.deliveredQuantity += deliveredQty;
    this.remainingQuantity = Math.max(
      0,
      this.quantityOrdered - this.deliveredQuantity,
    );
  }
}

export class SparePartHistory {
  private orderRecords: SparePartOrderRecord[] = []; // List of all order records

  // Add a new spare part order record to the history
  addOrderRecord(
    orderId: string,
    sparePart: SparePart,
    quantityOrdered: number,
    costPerUnit: number,
    estimatedDeliveryDate: Date,
  ): void {
    const totalCost = quantityOrdered * costPerUnit;
    const record = new SparePartOrderRecord(
      orderId,
      sparePart.id,
      sparePart.name,
      new Date(),
      quantityOrdered,
      costPerUnit,
      totalCost,
      estimatedDeliveryDate,
      0, // Delivered quantity starts at 0
      quantityOrdered, // Initially, remaining quantity equals the ordered quantity
    );
    this.orderRecords.push(record);
  }

  // Update delivery information for a specific order by orderId
  updateOrderDelivery(orderId: string, deliveredQty: number): void {
    const orderRecord = this.orderRecords.find(
      (record) => record.orderId === orderId,
    );
    if (orderRecord) {
      orderRecord.updateDelivery(deliveredQty);
    }
  }

  // Retrieve the full history of orders
  getFullHistory(): SparePartOrderRecord[] {
    return this.orderRecords;
  }

  // Retrieve orders for a specific spare part by its ID
  getHistoryBySparePartId(sparePartId: string): SparePartOrderRecord[] {
    return this.orderRecords.filter(
      (record) => record.sparePartId === sparePartId,
    );
  }

  // Retrieve order history within a specific date range
  getHistoryByDateRange(
    startDate: Date,
    endDate: Date,
  ): SparePartOrderRecord[] {
    return this.orderRecords.filter(
      (record) => record.orderDate >= startDate && record.orderDate <= endDate,
    );
  }

  // Calculate total expenditure on spare part orders within a date range or overall
  calculateTotalExpenditure(startDate?: Date, endDate?: Date): number {
    const relevantRecords =
      startDate && endDate
        ? this.getHistoryByDateRange(startDate, endDate)
        : this.orderRecords;

    return relevantRecords.reduce(
      (total, record) => total + record.totalCost,
      0,
    );
  }
}
