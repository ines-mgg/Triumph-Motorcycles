import { SparePartHistoryEntity } from "@triumph-motorcycles/domain/entities";
import { SparePartHistoryRecordNotFoundError } from "@triumph-motorcycles/domain/errors";

export interface SparePartHistoryRecordRepository {
  save(orderRecord: SparePartHistoryEntity): Promise<void>;
  findByOrderId(orderId: string): Promise<SparePartHistoryEntity | SparePartHistoryRecordNotFoundError>;
  findAll(): Promise<SparePartHistoryEntity[] | SparePartHistoryRecordNotFoundError>;
}
