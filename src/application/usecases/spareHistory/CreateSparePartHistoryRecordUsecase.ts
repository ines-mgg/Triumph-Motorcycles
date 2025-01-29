import { SparePartHistoryEntity } from '@triumph-motorcycles/domain/entities/parts/SparePartHistoryEntity';
import { SparePartEntity } from '@triumph-motorcycles/domain/entities/parts/SparePartEntity';
import { SparePartHistoryRecordRepository } from '@triumph-motorcycles/application/repositories/SparePartHistoryRecordRepository';

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
      estimatedDeliveryDate,
    );

    await this.sparePartOrderRecordRepository.save(orderRecord);
  }
}
