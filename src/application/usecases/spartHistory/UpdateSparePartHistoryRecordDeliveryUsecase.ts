import { SparePartOrderHistoryNotFoundError } from "../../../domain/errors/sparePart/SparePartOrderHistoryNotFoundError";
import { SparePartHistoryRecordRepository } from "../../repositories/SparePartHistoryRecordRepository";

export class UpdateSparePartHistoryRecordDeliveryUsecase {
  constructor(
    private readonly sparePartHistoryRecordRepository: SparePartHistoryRecordRepository,
  ) {}

  public async execute(
    orderId: string,
    deliveredQty: number,
  ): Promise<void | Error> {
    const orderRecord = await this.sparePartHistoryRecordRepository.findByOrderId(orderId);
    if (!orderRecord) {
      return new SparePartOrderHistoryNotFoundError();
    }

    orderRecord.updateDelivery(deliveredQty);
    await this.sparePartHistoryRecordRepository.save(orderRecord);
  }
}
