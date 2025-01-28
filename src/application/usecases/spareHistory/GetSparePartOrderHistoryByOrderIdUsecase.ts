import { SparePartHistoryRecordRepository } from '@triumph-motorcycles/application/repositories/SparePartHistoryRecordRepository';
import { SparePartHistoryEntity } from '@triumph-motorcycles/domain/entities/parts/SparePartHistoryEntity';

export class GetSparePartOrderHistoryByOrderIdUsecase {
  constructor(
    private readonly sparePartHistoryRecordRepository: SparePartHistoryRecordRepository,
  ) {}

  public async execute(
    orderId: string,
  ): Promise<SparePartHistoryEntity | Error> {
    return await this.sparePartHistoryRecordRepository.findByOrderId(orderId);
  }
}
