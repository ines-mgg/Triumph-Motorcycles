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

  updateDelivery(deliveredQty: number): void {
    this.deliveredQuantity += deliveredQty;
    this.remainingQuantity = Math.max(
      0,
      this.quantityOrdered - this.deliveredQuantity,
    );
  }
}

export class SparePartHistory {
  private readonly orderRecords: SparePartOrderRecord[] = []; 

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
      0,
      quantityOrdered, 
    );
    this.orderRecords.push(record);
  }

  updateOrderDelivery(orderId: string, deliveredQty: number): void {
    const orderRecord = this.orderRecords.find(
      (record) => record.orderId === orderId,
    );
    if (orderRecord) {
      orderRecord.updateDelivery(deliveredQty);
    }
  }

  getFullHistory(): SparePartOrderRecord[] {
    return this.orderRecords;
  }

  getHistoryBySparePartId(sparePartId: string): SparePartOrderRecord[] {
    return this.orderRecords.filter(
      (record) => record.sparePartId === sparePartId,
    );
  }

  getHistoryByDateRange(
    startDate: Date,
    endDate: Date,
  ): SparePartOrderRecord[] {
    return this.orderRecords.filter(
      (record) => record.orderDate >= startDate && record.orderDate <= endDate,
    );
  }

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
