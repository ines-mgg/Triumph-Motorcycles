import { DeliveryError, InvalidOrderError, InvalidQuantityError } from '../../errors/parts';
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
  ) {
    this.validateInputs();
  }

  private validateInputs(): void {
    if (!this.orderId || !this.sparePartId) {
      throw new InvalidOrderError("L'ID de la commande et l'ID de la pièce sont obligatoires.");
    }
    if (this.quantityOrdered < 0) {
      throw new InvalidQuantityError("La quantité commandée ne peut pas être négative.");
    }
    if (this.costPerUnit < 0) {
      throw new InvalidQuantityError("Le coût unitaire ne peut pas être négatif.");
    }
  }

  updateDelivery(deliveredQty: number): void {
    if (deliveredQty < 0) {
        throw new InvalidQuantityError("La quantité livrée ne peut pas être négative.");
    }

    if (this.deliveredQuantity + deliveredQty > this.quantityOrdered) {
        throw new DeliveryError("La quantité livrée dépasse la quantité commandée.");
    }

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
    if (!orderRecord) {
      throw new InvalidOrderError("L'enregistrement de commande spécifié n'existe pas.");
    }
    orderRecord.updateDelivery(deliveredQty);
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
