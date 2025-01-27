import { SparePartHistoryRecordRepository } from '@triumph-motorcycles/application/repositories';
import { SparePartHistoryEntity } from '@triumph-motorcycles/domain/entities';


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
