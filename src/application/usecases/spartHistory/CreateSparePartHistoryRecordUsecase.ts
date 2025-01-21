import { SparePartEntity, SparePartHistoryEntity } from "@triumph-motorcycles/domain/entities/parts";
import { SparePartHistoryRecordRepository } from "../../repositories/SparePartHistoryRecordRepository";

export class CreateSparePartOrderRecordUsecase {
  constructor(
    private readonly sparePartOrderRecordRepository: SparePartHistoryRecordRepository,
  ) {}

  public async execute(
    sparePart: SparePartEntity,
    quantityOrdered: number,
    costPerUnit: number,
    estimatedDeliveryDate: Date,
  ): Promise<void | Error> {
    const orderRecord = SparePartHistoryEntity.create(
      sparePart,
      quantityOrdered,
      costPerUnit,
      estimatedDeliveryDate
    );

    await this.sparePartOrderRecordRepository.save(orderRecord);
  }
}
