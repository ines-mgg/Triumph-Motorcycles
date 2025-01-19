import { SparePartHistoryEntity } from "@triumph-motorcycles/domain/entities/parts";

export interface SparePartHistoryRecordRepository {
  save(orderRecord: SparePartHistoryEntity): Promise<void>;
  findByOrderId(orderId: string): Promise<SparePartHistoryEntity | null>;
  findAll(): Promise<SparePartHistoryEntity[]>;
}
