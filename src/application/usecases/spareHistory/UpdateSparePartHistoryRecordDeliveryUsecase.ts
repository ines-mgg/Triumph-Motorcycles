import { SparePartHistoryRecordRepository } from '@triumph-motorcycles/application/repositories';

export class UpdateSparePartHistoryRecordDeliveryUsecase {
  constructor(
    private readonly sparePartHistoryRecordRepository: SparePartHistoryRecordRepository,
  ) {}

  public async execute(orderId: string): Promise<void | Error> {
    const orderRecord =
      await this.sparePartHistoryRecordRepository.findByOrderId(orderId);

    if (orderRecord instanceof Error) return orderRecord;

    await this.sparePartHistoryRecordRepository.save(orderRecord);
  }
}
