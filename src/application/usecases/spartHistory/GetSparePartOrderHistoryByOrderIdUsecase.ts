import { SparePartHistoryEntity } from "@triumph-motorcycles/domain/entities/parts";
import { SparePartHistoryRecordRepository } from "../../repositories/SparePartHistoryRecordRepository";

export class GetSparePartOrderHistoryByOrderIdUsecase {
  constructor(
    private readonly sparePartHistoryRecordRepository: SparePartHistoryRecordRepository,
  ) {}

  public async execute(orderId: string): Promise<SparePartHistoryEntity | null> {
    return await this.sparePartHistoryRecordRepository.findByOrderId(orderId);
  }
}
