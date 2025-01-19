import { SparePartEntity, SparePartHistoryEntity } from "@triumph-motorcycles/domain/entities/parts";
import { SparePartHistoryRecordRepository } from "../../repositories/SparePartHistoryRecordRepository";

export class CreateSparePartOrderRecordUsecase {
  constructor(
    private readonly sparePartOrderRecordRepository: SparePartHistoryRecordRepository,
  ) {}

  public async execute(
    orderId: string,
    sparePart: SparePartEntity,
    quantityOrdered: number,
    costPerUnit: number,
    estimatedDeliveryDate: Date,
  ): Promise<void | Error> {
    const orderRecord = SparePartHistoryEntity.create(
      orderId,
      sparePart,
      quantityOrdered,
      costPerUnit,
      estimatedDeliveryDate
    );

    await this.sparePartOrderRecordRepository.save(orderRecord);
  }
}
