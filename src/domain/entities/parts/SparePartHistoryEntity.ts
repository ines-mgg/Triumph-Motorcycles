import { SparePartOrderRecordCostPerUnit } from '../../values/sparePartOrderRecord/SparePartOrderRecordCostPerUnit';
import { SparePartOrderRecordDeliveredQuantity } from '../../values/sparePartOrderRecord/SparePartOrderRecordDeliveredQuantity';
import { SparePartOrderRecordPartName } from '../../values/sparePartOrderRecord/SparePartOrderRecordPartName';
import { SparePartOrderRecordQuantityOrdered } from '../../values/sparePartOrderRecord/SparePartOrderRecordQuantityOrdered';
import { SparePartOrderRecordRemainingQuantity } from '../../values/sparePartOrderRecord/SparePartOrderRecordRemainingQuantity';
import { SparePartOrderRecordTotalCost } from '../../values/sparePartOrderRecord/SparePartOrderRecordTotalCost';
import { SparePartEntity } from './SparePartEntity';
import crypto from 'crypto';

export class SparePartHistoryEntity {
  private constructor(
    public readonly id: string,
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
    sparePart: SparePartEntity,
    quantityOrdered: number,
    costPerUnit: number,
    estimatedDeliveryDate: Date,
  ): SparePartHistoryEntity {
    const id = crypto.randomUUID();

    const totalCostValue = quantityOrdered * costPerUnit;

    const instance = new SparePartHistoryEntity(
      id,
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
}
