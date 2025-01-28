import { SparePartOrderRecordCostPerUnit } from '@triumph-motorcycles/domain/values/sparePartOrderRecord/SparePartOrderRecordCostPerUnit.ts';
import { SparePartOrderRecordPartName } from '@triumph-motorcycles/domain/values/sparePartOrderRecord/SparePartOrderRecordPartName';
import { SparePartOrderRecordQuantityOrdered } from '@triumph-motorcycles/domain/values/sparePartOrderRecord/SparePartOrderRecordQuantityOrdered';
import { SparePartOrderRecordTotalCost } from '@triumph-motorcycles/domain/values/sparePartOrderRecord/SparePartOrderRecordTotalCost';
import { SparePartOrderRecordRemainingQuantity } from '@triumph-motorcycles/domain/values/sparePartOrderRecord/SparePartOrderRecordRemainingQuantity';
import { SparePartOrderRecordDeliveredQuantity } from '@triumph-motorcycles/domain/values/sparePartOrderRecord/SparePartOrderRecordDeliveredQuantity';
import { SparePartEntity } from './SparePartEntity';
import { v4 as uuidv4 } from 'uuid';

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
    const id = uuidv4();

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
