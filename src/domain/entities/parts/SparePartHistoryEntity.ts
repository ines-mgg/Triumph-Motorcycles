import { DeliveryError } from "../../errors/parts";
import { SparePartOrderRecordCostPerUnit } from "../../values/SparePartOrderRecord/SparePartOrderRecordCostPerUnit";
import { SparePartOrderRecordDeliveredQuantity } from "../../values/SparePartOrderRecord/SparePartOrderRecordDeliveredQuantity";
import { SparePartOrderRecordPartName } from "../../values/SparePartOrderRecord/SparePartOrderRecordPartName";
import { SparePartOrderRecordQuantityOrdered } from "../../values/SparePartOrderRecord/SparePartOrderRecordQuantityOrdered typescript Copier le code";
import { SparePartOrderRecordRemainingQuantity } from "../../values/SparePartOrderRecord/SparePartOrderRecordRemainingQuantity";
import { SparePartOrderRecordTotalCost } from "../../values/SparePartOrderRecord/SparePartOrderRecordTotalCost";
import { SparePartEntity } from "./SparePartEntity";

export class SparePartHistoryEntity {
  private constructor(
    public readonly orderId: string,
    public readonly sparePart: SparePartEntity,
    public readonly partName: SparePartOrderRecordPartName,
    public readonly orderDate: Date,
    public readonly quantityOrdered: SparePartOrderRecordQuantityOrdered,
    public readonly costPerUnit: SparePartOrderRecordCostPerUnit,
    public readonly totalCost: SparePartOrderRecordTotalCost,
    public readonly estimatedDeliveryDate: Date,
    public deliveredQuantity: SparePartOrderRecordDeliveredQuantity,
    public remainingQuantity: SparePartOrderRecordRemainingQuantity,
  ) {}

  public static create(
    orderId: string,
    sparePart: SparePartEntity,
    quantityOrdered: number,
    costPerUnit: number,
    estimatedDeliveryDate: Date,
  ): SparePartHistoryEntity {
    const totalCostValue = quantityOrdered * costPerUnit;

    const instance = new SparePartHistoryEntity(
      orderId,
      sparePart,
      new SparePartOrderRecordPartName(sparePart.name.value),
      new Date(),
      new SparePartOrderRecordQuantityOrdered(quantityOrdered),
      new SparePartOrderRecordCostPerUnit(costPerUnit),
      new SparePartOrderRecordTotalCost(totalCostValue),
      estimatedDeliveryDate,
      new SparePartOrderRecordDeliveredQuantity(0),
      new SparePartOrderRecordRemainingQuantity(quantityOrdered),
    );
    return instance;
  }

  updateDelivery(deliveredQty: number): void {
    const newDeliveredQty = new SparePartOrderRecordDeliveredQuantity(
      this.deliveredQuantity.value + deliveredQty,
    );

    if (newDeliveredQty.value > this.quantityOrdered.value) {
      throw new DeliveryError(
        'La quantité livrée dépasse la quantité commandée.',
      );
    }

    this.deliveredQuantity = newDeliveredQty;
    this.remainingQuantity = new SparePartOrderRecordRemainingQuantity(
      this.quantityOrdered.value - this.deliveredQuantity.value,
    );
  }
}
